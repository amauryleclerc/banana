import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../models/sprint';
import { Story, StoryInSprint } from '../../models/story';
import { SprintService } from '../../services/sprint.service';
import { StoryService } from '../../services/story.service';
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
  stories: Story[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private sprintService: SprintService,
    private storyService: StoryService) {
    this.sprint = Sprint.create();
    this.stories = new Array<Story>();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.sprintService.getOne(params['id']))//
      .do((sprint: Sprint) => this.sprint = sprint)//
      .do(sprint => this.stories = new Array<Story>())//
      .switchMap(sprint => this.sprintService.getStories(sprint.id))
      .do(s => console.log(s))
      .subscribe((story: Story) => this.stories.push(story));
  }

  add() {
    this.sprintService.setCurrentSprint(this.sprint);
    const ref: NgbModalRef = this.modalService.open(NewStoryComponent);
    Observable.fromPromise(ref.result)//
      .flatMap(s => this.sprintService.addStory(this.sprint.id, s))//
      .subscribe((story: Story) => this.stories.unshift(story), //
      e => this.sprintService.setCurrentSprint(null), //
      () => this.sprintService.setCurrentSprint(null));
  }



  private save(story: Story) {
    this.storyService.save(story)//
      .subscribe((s) => {
        this.replace(s);
      });
  }

  private cancel(story: Story) {
    this.replace(story);
  }

  private selectMore(story: Story) {
    this.router.navigate(['/story', story.id]);
  }

  private replace(story: Story) {
    const index = this.stories.findIndex(s => s.id === story.id);
    if (index !== -1) {
      this.stories[index] = story;
    }
  }

}
