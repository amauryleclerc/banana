import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Sprint } from '../models/sprint';
import { Story } from '../models/story';
import { StoryService } from './story.service';
import { Observable } from 'rxjs/Rx';
import { AbstractRestClientService } from './abstract-rest-client.service';

@Injectable()
export class SprintService extends AbstractRestClientService<Sprint>  {

  public static readonly URL = 'http://localhost:9000/api/sprints';
  public static readonly EMBEDDED_NAME = 'sprints';

  private currentSprint: Sprint;

  constructor(private http: Http, private storyService: StoryService) {
    super(http, SprintService.URL, SprintService.EMBEDDED_NAME);
  }


  setCurrentSprint(sprint: Sprint) {
    this.currentSprint = sprint;
  }
  getCurrentSprint(): Sprint {
    return this.currentSprint;
  }

  getStories(sprintId: string): Observable<Story> {
    return this.http.get(SprintService.URL + '/' + sprintId + '/stories')//
      .filter(res => res.status === 200)//
      .map(res => res.json()._embedded.stories)//
      .flatMap(list => Observable.from(list))
      .map(o => Story.create(o));
  }

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
      .flatMap(s => this.http.post(SprintService.URL + '/' + sprintId + '/stories', s._links.self.href, {
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
}
