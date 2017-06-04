import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StoryInSprint } from '../models/story';
import { AbstractRestClientService } from './abstract-rest-client.service';
import { Observable} from 'rxjs/Rx';

@Injectable()
export class StoryInSprintService extends AbstractRestClientService<StoryInSprint>  {

  public static readonly EMBEDDED_NAME = 'storiesInSprint';
  constructor(http: Http) {
    super(http, StoryInSprintService.EMBEDDED_NAME);
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
}
