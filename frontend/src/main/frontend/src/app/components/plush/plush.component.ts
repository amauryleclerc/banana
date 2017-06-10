import { Component, OnInit } from '@angular/core';
import { PlushService } from '../../services/plush.service';
import { PlushState } from '../../models/plush-state';
import { Plush } from '../../models/plush';
import { User } from '../../models/user';
import { LocalStorageService } from 'angular-2-local-storage';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-plush',
  templateUrl: './plush.component.html',
  styleUrls: ['./plush.component.css']
})
export class PlushComponent implements OnInit {

  memberName: String = '';
  memberId: String = '';
  plushs: Array<PlushState> = new Array();
  isFullScreen: Boolean = false;
  isValid: Boolean = false;
  constructor(private plushService: PlushService,
    private localStorageService: LocalStorageService,
    private contextService: ContextService) {
    this.memberName = localStorageService.get<string>('memberName');
    this.memberId = localStorageService.get<string>('memberId');
    if (this.memberName != null && this.memberName !== '') {
      this.isValid = true;
    }
  }


  ngOnInit() {
    this.plushService.getPlushs().subscribe(plush => this.addOrReplace(plush), e => console.error(e));
    this.contextService.getFullScreenMode().subscribe(v => this.isFullScreen = v, e => console.error(e));
  }

  private addOrReplace(plush: PlushState): void {
    const index = this.plushs.findIndex(s => s.plush.id === plush.plush.id);
    if (index !== -1) {
      this.plushs[index] = plush;
    } else {
      this.plushs.push(plush);
    }
  }

  onMemberNameChange(): void {
    if (this.memberName != null && this.memberName !== '') {
      this.memberId = this.memberName.trim().toLowerCase();
      this.localStorageService.set('memberName', this.memberName);
      this.localStorageService.set('memberId', this.memberId);
      this.isValid = true;
    } else {
      this.localStorageService.set('memberName',null);
      this.localStorageService.set('memberId',null);
      this.isValid = false;
    }
  }

  take(plush: Plush): void {
    if (this.memberId !== null && this.memberId !== '') {
      this.plushService.take(new PlushState(plush, new User(this.memberId.toString(), this.memberName.toString())));
    }
  }

  release(plush: Plush): void {
    if (this.memberId !== null && this.memberId !== '') {
      this.plushService.release(new PlushState(plush, new User(this.memberId.toString(), this.memberName.toString())));
    }
  }
}
