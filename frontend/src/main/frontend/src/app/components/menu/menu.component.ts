import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../models/sprint';
import { SprintService } from '../../services/sprint.service';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public sprint: Sprint = null;
  public sprints: Sprint[] = new Array<Sprint>();
  public isCollapsed:boolean = false;
  constructor(private sprintService: SprintService, private contextService: ContextService) {

  }

  ngOnInit() {
     
    this.sprintService.getAll()//
      .subscribe((sprint: Sprint) => {
      if (this.sprint == null) {
          this.sprint = sprint;
          this.contextService.setSelectedSprint(sprint);
        }
        this.sprints.push(sprint);

      }, e => console.error(e));

  }

  onSprintChange(sprint: Sprint) {
     this.contextService.setSelectedSprint(sprint);
  }
}
