import { Component, OnInit } from '@angular/core';
import { ProjectJiraService } from '../../../services/jira/project-jira.service';
import { Project } from '../../../models/project';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-jira-project',
  templateUrl: './jira-project.component.html',
  providers: [ProjectJiraService]
})
export class JiraProjectComponent implements OnInit {


  projects: Array<Project> = new Array();

  constructor(
    private projectJiraService: ProjectJiraService) {
  }

  ngOnInit() {
    this.projectJiraService.getAll()//
      .subscribe(v => this.projects.push(v), e => console.error(e));
  }


}
