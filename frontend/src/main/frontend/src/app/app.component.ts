import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en', 'fr']);
    translateService.setDefaultLang('en');
    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }


}
