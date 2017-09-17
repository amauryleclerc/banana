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
    return this._save(Sprint.create(sprint));
  }

}
