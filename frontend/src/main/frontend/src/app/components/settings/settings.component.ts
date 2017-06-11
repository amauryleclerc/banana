import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isFullScreen: Boolean = false;
  currentLang: string;
  langs: Array<string>;
  constructor(private contextService: ContextService, private translateService: TranslateService) {
    this.contextService.getFullScreenMode()//
      .subscribe(v => this.isFullScreen = v, e => console.error(e));
    this.currentLang = this.translateService.currentLang,
      this.langs = this.translateService.getLangs();

  }

  ngOnInit() {
  }

  onFullScreenChange(checked: Boolean) {
    this.contextService.setFullScreenMode(checked);
  }
  onCurrentLangChange(currentLang: string) {
    this.translateService.use(currentLang);
  }
}
