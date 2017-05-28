import { Component, OnInit, HostListener } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story';
import { NewStoryComponent } from '../new-story/new-story.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  public stories: Story[];
  public complexities: number[];
  public types: string[];
  constructor(private storyService: StoryService, private modalService: NgbModal, private router: Router) {
    this.stories = new Array<Story>();
    this.complexities = [0, 0.5, 1, 2, 3, 5, 8, 13];
    this.types = ['USER_STORY', 'BUG_STORY', 'TECHNICAL_STORY'];
  }

  ngOnInit() {

    this.storyService.getAllByPage().subscribe(v => {
      this.stories.push(v);
    });

  }

  add() {
    Observable.fromPromise(
      this.modalService.open(NewStoryComponent).result)//
      .flatMap(s => this.storyService.save(s))//
      .subscribe((story) => {
        this.stories.unshift(story);
      });
  }

  save(story: Story) {
    this.storyService.save(story)//
      .subscribe((s) => {
        this.replace(s);
      });
  }

  cancel(story: Story) {
    this.replace(story);
  }

  selectMore(story: Story) {
    this.router.navigate(['/story', story.id]);
  }
  
  private replace(story: Story) {
    const index = this.stories.findIndex(s => s.id === story.id);
    if (index !== -1) {
      this.stories[index] = story;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.storyService.loadMore();
    }
  }



}
