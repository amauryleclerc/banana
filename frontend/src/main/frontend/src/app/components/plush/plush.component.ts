import { Component, OnInit } from '@angular/core';
import { PlushService } from '../../services/plush.service';
import { PlushState } from '../../models/plush-state';
import { Plush } from '../../models/plush';
import { User } from '../../models/user';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-plush',
  templateUrl: './plush.component.html',
  styleUrls: ['./plush.component.css']
})
export class PlushComponent implements OnInit {

  memberName: string = '';
  memberId: string = '';
  plushs: Array<PlushState> = new Array();
  constructor(private plushService: PlushService, private localStorageService: LocalStorageService) {
    this.memberName = localStorageService.get<string>('memberName');
    this.memberId = localStorageService.get<string>('memberId');
  }


  ngOnInit() {
    this.plushService.getPlushs().subscribe(plush => this.addOrReplace(plush), e => console.error(e));
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
    }
  }

  take(plush: Plush): void {
    if (this.memberId !== null && this.memberId !== '') {
      this.plushService.take(new PlushState(plush, new User(this.memberId, this.memberName)));
    }
  }

  release(plush: Plush): void {
    if (this.memberId !== null && this.memberId !== '') {
      this.plushService.release(new PlushState(plush, new User(this.memberId, this.memberName)));
    }
  }
}
