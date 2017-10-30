import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { Sprint } from '../../models/sprint';
import { SprintService } from '../../services/sprint.service';
import { ContextService } from '../../services/context.service';
import { ProjectJiraService } from '../../services/jira/project-jira.service';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  project: Project = null;
  projects: Project[] = new Array<Project>();
  sprint: Sprint = null;
  sprints: Sprint[] = new Array<Sprint>();
  isCollapsed: Boolean = false;
  showSprints: Boolean = false;
  isFullScreen: Boolean = false;
  constructor(private sprintService: SprintService, private contextService: ContextService, private projectService: ProjectJiraService) {

  }

  ngOnInit() {
    Observable.concat(
      this.sprintService.getAll()//
        .do((sprint: Sprint) => this.sprints.push(sprint))
        .map(s => true),
      this.contextService.getSelectedSprintId()//
        .map(id => this.sprints.find(s => s.id === id))
        .do(s => this.sprint = s)
        .map(s => true)
    ).subscribe(v => { }, e => console.error(e));

    this.contextService.getViewSelected()//
      .map(v => v === 'graph')
      .distinctUntilChanged()
      .subscribe(v => this.showSprints = v, e => console.log(e));

    this.contextService.getFullScreenMode()//
      .distinctUntilChanged()
      .subscribe(v => this.isFullScreen = v, e => console.error(e));

    this.projectService.getAll()//
      .do(a => console.log('log paulo !!!!!!!!!!!!'))
      .subscribe(v => this.project = v, e => console.error('log paulo !!!!!!!!!!!!' + e));
  }

  onSprintChange(sprint: Sprint) {
    this.contextService.setSelectedSprint(sprint.id);
  }

  addPotentialNewSprint() {
    this.sprintService.getAll()//
      .filter(sprint => this.sprints.find(s => s.id === sprint.id) == null)//
      .do(newSprint => this.sprints.push(newSprint))//
      .subscribe(__ => { }, e => console.error(e));
  }
}
