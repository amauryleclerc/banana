import { Component, OnInit, Input } from '@angular/core';
import { Story, StoryInSprint } from '../../models/story';
import { Sprint } from '../../models/sprint';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story-in-sprint.component.html'
})
export class AddStoryInSprintComponent  implements OnInit {

  public stories: StoryInSprint[];
  public story: StoryInSprint;
  public complexities: number[];
  public types: string[];


  constructor(private activeModal: NgbActiveModal, ) {
    this.stories = new Array();
    this.story = StoryInSprint.create();
    this.story.story = Story.create();
    this.complexities = [0, 0.5, 1, 2, 3, 5, 8, 13];
    this.types = ['USER_STORY', 'BUG_STORY', 'TECHNICAL_STORY'];
  }

  ngOnInit() {

  }

  setSprint(sprint: Sprint) {
    if (sprint != null) {
      this.story.added = sprint.start;
      this.story.setSprint(sprint);
    }
  }

  save() {
    this.activeModal.close(this.story);
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }


}
