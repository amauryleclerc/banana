import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { StoryService } from '../../services/story.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'story',
  templateUrl: './story.component.html'
})
export class StoryComponent implements OnInit {

  story: Story;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService
  ) {
    this.story = Story.create();

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.storyService.getOne(params['id']))
      .subscribe((story: Story) => this.story = story);

  }

}
