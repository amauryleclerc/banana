import { Component, OnInit } from '@angular/core';
import { SprintJiraService } from '../../../services/jira/sprint-jira.service';
import { Sprint } from '../../../models/sprint';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-jira-sprint',
    templateUrl: './jira-sprint.component.html',
    providers: [SprintJiraService]
})
export class JiraSprintComponent implements OnInit {


    sprints: Array<Sprint> = new Array();

    constructor(
        private sprintJiraService: SprintJiraService, //
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.sprintJiraService.getFromProject(params['id']))//
            .subscribe(v => this.sprints.push(v), e => console.error(e));
    }


}
