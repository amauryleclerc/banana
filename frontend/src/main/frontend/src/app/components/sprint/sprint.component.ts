import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../models/sprint';
import { Story, StoryInSprint } from '../../models/story';
import { SprintService } from '../../services/sprint.service';
import { StoryService } from '../../services/story.service';
import { StoryInSprintService } from '../../services/story-in-sprint.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NewStoryInSprintComponent } from '../new-story-in-sprint/new-story-in-sprint.component';
import { StoryFilter } from './story.filter';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  providers: [StoryFilter]
})
export class SprintComponent implements OnInit {

  sprint: Sprint;
  complexities: number[];
  types: string[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private sprintService: SprintService,
    private storyService: StoryService,
    private storyInSprintService: StoryInSprintService) {
    this.sprint = Sprint.create();
    this.complexities = [0, 0.5, 1, 2, 3, 5, 8, 13];
    this.types = ['USER_STORY', 'BUG_STORY', 'TECHNICAL_STORY'];
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.sprintService.getOne(params['id']))//
      .subscribe((sprint: Sprint) => this.sprint = sprint, e => console.error(e))//
  }

  add() {
    const ref: NgbModalRef = this.modalService.open(NewStoryInSprintComponent);
    ref.componentInstance.setSprint(this.sprint);
    Observable.fromPromise(ref.result)//
      .flatMap(s => this.storyService.save(s.story).do(story => s.story = story).map(story => s))//
      .flatMap(s => this.storyInSprintService.save(s))//
      .subscribe((story: StoryInSprint) => this.sprint.stories.unshift(story), //
      e => console.error(e));
  }

  save(storyInSprint: StoryInSprint) {
    storyInSprint.setSprint(this.sprint);
    this.storyService.save(storyInSprint.story)//
      .do(s => storyInSprint.story = s)//
      .flatMap(s => this.storyInSprintService.save(storyInSprint))
      .subscribe((s) =>   this.replace(s)  , e => console.error(e));
  }

  cancel(storyInSprint: StoryInSprint) {
    this.replace(storyInSprint);
  }

  selectMore(storyInSprint: StoryInSprint) {
    this.router.navigate(['/story', storyInSprint.story.id]);
  }

  remove(storyInSprint: StoryInSprint) {
    storyInSprint.setSprint(this.sprint);
    this.storyInSprintService.remove(storyInSprint).subscribe((s) =>   this.replace(s)  , e => console.error(e));
  }
  private replace(storyInSprint: StoryInSprint) {
    const index = this.sprint.stories.findIndex(s => s.story.id === storyInSprint.story.id);
    if (index !== -1) {
      this.sprint.stories[index] = storyInSprint;
    }
  }

}
