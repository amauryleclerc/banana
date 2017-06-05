import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../models/sprint';
import { Story, StoryInSprint } from '../../models/story';
import { SprintService } from '../../services/sprint.service';
import { StoryService } from '../../services/story.service';
import { StoryInSprintService } from '../../services/story-in-sprint.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NewStoryComponent } from '../new-story/new-story.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
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
    this.sprintService.setCurrentSprint(this.sprint);
    const ref: NgbModalRef = this.modalService.open(NewStoryComponent);
    Observable.fromPromise(ref.result)//
      .flatMap(s => this.storyService.save(s))//
      .map(s => new StoryInSprint(true, s))
      .flatMap(s => this.storyInSprintService.save(s, this.sprint))//
      .subscribe((story: StoryInSprint) => this.sprint.stories.unshift(story), //
      e => this.sprintService.setCurrentSprint(null), //
      () => this.sprintService.setCurrentSprint(null));
  }



  private save(storyInSprint: StoryInSprint) {
    this.storyService.save(storyInSprint.story)//
      .subscribe((s) => {
        this.replace(new StoryInSprint(storyInSprint.isInScope, s));
      });
  }

  private cancel(storyInSprint: StoryInSprint) {
    this.replace(storyInSprint);
  }

  private selectMore(storyInSprint: StoryInSprint) {
    this.router.navigate(['/story', storyInSprint.story.id]);
  }

  private replace(storyInSprint: StoryInSprint) {
    const index = this.sprint.stories.findIndex(s => s.story.id === storyInSprint.story.id);
    if (index !== -1) {
      this.sprint.stories[index] = storyInSprint;
    }
  }

}
