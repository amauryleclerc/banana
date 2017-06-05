import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../models/sprint';
import { SprintService } from '../../services/sprint.service';
import { ContextService } from '../../services/context.service';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  sprint: Sprint = null;
  sprints: Sprint[] = new Array<Sprint>();
  isCollapsed: Boolean = false;
  showSprints: Boolean = false;
  constructor(private sprintService: SprintService, private contextService: ContextService) {

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


  }

  onSprintChange(sprint: Sprint) {
    this.contextService.setSelectedSprint(sprint.id);
  }
}
