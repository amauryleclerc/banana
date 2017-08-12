import { Component, OnInit } from '@angular/core';
import { StoryJiraService } from '../../../services/jira/story-jira.service';
import { SprintJiraService } from '../../../services/jira/sprint-jira.service';
import { Story } from '../../../models/story';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-jira-sprint',
    templateUrl: './jira-story.component.html',
    providers: [StoryJiraService, SprintJiraService]
})
export class JiraStoryComponent implements OnInit {

    test: string;
    stories: Array<Story> = new Array();

    constructor(
        private storyJiraService: StoryJiraService, //
        private sprintJiraService: SprintJiraService, //
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.storyJiraService.getFromSprint(params['id']))//
            .subscribe(v => this.stories.push(v), e => console.error(e));
    }

    getWorklog(story: Story) {
        this.sprintJiraService.test(story.jiraId).do(v => console.log(v)).subscribe(v => this.test = v, e => console.error(e));
    }
}
