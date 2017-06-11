import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isFullScreen: Boolean = false;
  constructor(private contextService: ContextService) {
    this.contextService.getFullScreenMode()//
      .subscribe(v => this.isFullScreen = v, e => console.error(e));

  }

  ngOnInit() {
  }

  onFullScreenChange(checked: Boolean){
    this.contextService.setFullScreenMode(checked);
  }

}
