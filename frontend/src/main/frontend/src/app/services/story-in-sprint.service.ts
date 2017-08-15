import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StoryInSprint } from '../models/story';
import { Sprint } from '../models/sprint';
import { StoryService } from './story.service';
import { AbstractRestClientService } from './abstract-rest-client.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StoryInSprintService extends AbstractRestClientService<StoryInSprint>  {

  public static readonly EMBEDDED_NAME = 'storiesInSprint';
  public static readonly CONTEXT_PATH = 'stories-in-sprint';
  constructor(private http: Http, private storyService: StoryService) {
    super(http, StoryInSprintService.CONTEXT_PATH, StoryInSprintService.EMBEDDED_NAME);
  }
  public getAllByPage(): Observable<StoryInSprint> {
    return this._getAllByPage().map(o => StoryInSprint.create(o));
  }
  public getAll(): Observable<StoryInSprint> {
    return this._getAll().map(o => StoryInSprint.create(o));
  }
  public getOne(id: string): Observable<StoryInSprint> {
    return this._getOne(id).map(o => StoryInSprint.create(o));
  }

  public save(storyInSprint: StoryInSprint): Observable<StoryInSprint> {
    const object: any = {
      story: storyInSprint.story._links.self.href,
      sprint: storyInSprint.getSprint()._links.self.href,
      inScope: storyInSprint.inScope,
      bonus: storyInSprint.bonus,
      removed: storyInSprint.removed,
      added: storyInSprint.added
    };
    return this.http.post(this.getUrl(), object)//
      .flatMap(res => this.handleResponse(res))
      .flatMap(s => this.storyService.getOne(storyInSprint.story.id)//
        .map(story => {
          s.story = story;
          return s;
        }));

  }

}
