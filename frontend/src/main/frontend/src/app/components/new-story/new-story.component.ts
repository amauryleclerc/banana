import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../models/story';
import { Sprint } from '../../models/sprint';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html'
})
export class NewStoryComponent implements OnInit {

  public story: Story;
  public complexities: number[];
  public types: string[];


  constructor(private activeModal: NgbActiveModal, private sprintService: SprintService) {
    this.story = Story.create();
    const sprint: Sprint = sprintService.getCurrentSprint();
    if (sprint != null) {
      this.story.addDate = sprint.start;
    }
    this.complexities = [0, 0.5, 1, 2, 3, 5, 8, 13];
    this.types = ['USER_STORY', 'BUG_STORY', 'TECHNICAL_STORY'];
  }

  ngOnInit() {
  }


  save() {
    this.activeModal.close(this.story);
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }


}
