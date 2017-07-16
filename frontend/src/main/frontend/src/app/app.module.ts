import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { GraphComponent } from './components/graph/graph.component';
import { StoryComponent } from './components/story/story.component';
import { StoriesComponent } from './components/stories/stories.component';
import { RouterModule, Routes } from '@angular/router';
import { TextfieldCellComponent } from './ui/textfield-cell/textfield-cell.component';
import { ComboboxCellComponent } from './ui/combobox-cell/combobox-cell.component';
import { DatepickerCellComponent } from './ui/datepicker-cell/datepicker-cell.component';
import { ActionCellComponent } from './ui/action-cell/action-cell.component';
import { NewStoryComponent } from './components/new-story/new-story.component';
import { DatepickerInputComponent } from './ui/datepicker-input/datepicker-input.component';
import { ReleaseService } from './services/release.service';
import { ReleasesComponent } from './components/releases/releases.component';
import { NewReleaseComponent } from './components/new-release/new-release.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { NewSprintComponent } from './components/new-sprint/new-sprint.component';
import { SprintService } from './services/sprint.service';
import { StoryService } from './services/story.service';
import { StoryInSprintService } from './services/story-in-sprint.service';
import { ContextService } from './services/context.service';
import { ConfigService } from './services/config.service';
import { PlushService } from './services/plush.service';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PlushComponent } from './components/plush/plush.component';
import { StompConfigService, StompService } from "@stomp/ng2-stompjs";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { HotkeyModule } from 'angular2-hotkeys';
import { SettingsComponent } from './components/settings/settings.component';
import { JiraProjectComponent } from './components/jira/project/jira-project.component';
import { JiraSprintComponent } from './components/jira/sprint/jira-sprint.component';
import { JiraStoryComponent } from './components/jira/story/jira-story.component';


declare var require: any;

const appRoutes: Routes = [
  { path: 'stories', component: StoriesComponent },
  { path: 'story/:id', component: StoryComponent },
  { path: 'releases', component: ReleasesComponent },
  { path: 'sprints', component: SprintsComponent },
  { path: 'sprint/:id', component: SprintComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'plush', component: PlushComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'jira/project', component: JiraProjectComponent },
  { path: 'jira/sprint/:id', component: JiraSprintComponent },
  { path: 'jira/story/:id', component: JiraStoryComponent },
  { path: '', redirectTo: '/sprints', pathMatch: 'full' },
  { path: '*', redirectTo: '/sprints', pathMatch: 'full' },
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function highchartsFactory() {
  const hc = require('highcharts');
  const ba = require('highcharts/modules/broken-axis');
  ba(hc);
  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GraphComponent,
    StoryComponent,
    StoriesComponent,
    TextfieldCellComponent,
    ComboboxCellComponent,
    DatepickerCellComponent,
    ActionCellComponent,
    NewStoryComponent,
    DatepickerInputComponent,
    NewReleaseComponent,
    ReleasesComponent,
    SprintComponent,
    SprintsComponent,
    NewSprintComponent,
    PlushComponent,
    SettingsComponent,
    JiraProjectComponent,
    JiraSprintComponent,
    JiraStoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HotkeyModule.forRoot(),
    ChartModule,
    LocalStorageModule.withConfig({
      prefix: 'banana',
      storageType: 'localStorage'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })

  ],
  providers: [//
    ReleaseService,//
    SprintService, //
    PlushService, //
    StoryService, //
    StoryInSprintService,
    ContextService, //
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }, //
    StompService, //
    {
      provide: StompConfigService,
      useClass: ConfigService
    },
    LocalStorageService
  ],
  entryComponents: [//
    NewReleaseComponent,//
    NewStoryComponent,//
    NewSprintComponent//
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
