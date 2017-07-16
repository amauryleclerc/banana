import { Component, OnInit } from '@angular/core';
import { StoryJiraService } from '../../../services/jira/story-jira.service';
import { Story } from '../../../models/story';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-jira-sprint',
    templateUrl: './jira-story.component.html',
    providers: [StoryJiraService]
})
export class JiraStoryComponent implements OnInit {


    stories: Array<Story> = new Array();

    constructor(
        private storyJiraService: StoryJiraService, //
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) =>   this.storyJiraService.getFromSprint(params['id']))//
            .subscribe(v => this.stories.push(v), e => console.error(e));
    }


}
