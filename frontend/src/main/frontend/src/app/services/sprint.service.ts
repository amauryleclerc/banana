import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Sprint } from '../models/sprint';
import { Story, StoryInSprint } from '../models/story';
import { StoryService } from './story.service';
import { Observable } from 'rxjs/Rx';
import { AbstractRestClientService } from './abstract-rest-client.service';

@Injectable()
export class SprintService extends AbstractRestClientService<Sprint>  {

  public static readonly EMBEDDED_NAME = 'sprints';

  constructor(private http: Http, private storyService: StoryService) {
    super(http, SprintService.EMBEDDED_NAME);
  }

  /*  getStoriesInSprint(sprintId: string): Observable<StoryInSprint> {
      return this.http.get(super.getUrl() + '/' + sprintId + '/stories')//
        .filter(res => res.status === 200)//
        .map(res => res.json()._embedded.storiesInSprint)//
        .flatMap(list => Observable.from(list))
        .map(o => StoryInSprint.create(o));
    }
  
    getStories(sprintId: string): Observable<Story> {
      return this.http.get(super.getUrl() + '/' + sprintId + '/stories')//
        .filter(res => res.status === 200)//
        .map(res => res.json()._embedded.storiesInSprint)//
        .flatMap(list => Observable.from(list))
        .map(o => StoryInSprint.create(o))
        .map(s => s.story);
    }*/

  addStory(sprintId: string, story: Story): Observable<Story> {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'text/uri-list');
    return Observable.of(story)//
      .flatMap(s => {
        if (s.id != null) {
          return Observable.of(s);
        } else {
          return this.storyService.save(s);
        }
      })//
      .flatMap(s => this.http.post(super.getUrl() + '/' + sprintId + '/stories', s._links.self.href, {
        headers: headers
      }).map(res => Story.create(s)));
  }


  public getAllByPage(): Observable<Sprint> {
    return this._getAllByPage().map(o => Sprint.create(o));
  }
  public getAll(): Observable<Sprint> {
    return this._getAll().map(o => Sprint.create(o));
  }
  public getOne(id: string): Observable<Sprint> {
    return this._getOne(id).map(o => Sprint.create(o));
  }
  public save(sprint: Sprint): Observable<Sprint> {
 //   let copy = {...sprint};
    //copy.stories = null;
    return this._save(Sprint.create(sprint));
  }
  /*  public saveStoryInSprint(storyInSprint: StoryInSprint): Observable<StoryInSprint> {
      const object: any = {
        story: storyInSprint.story._links.self.href,
        sprint: storyInSprint.sprint._links.self.href,
        isInScope: storyInSprint.isInScope
      };
  
      return this.http.post(this.getUrl(), object)//
        .flatMap(res => this.handleResponse(res));
  
    }*/
}
