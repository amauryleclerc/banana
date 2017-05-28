import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Story } from '../models/story';
import { AbstractRestClientService } from './abstract-rest-client.service';
import { Observable} from 'rxjs/Rx';

@Injectable()
export class StoryService extends AbstractRestClientService<Story>  {

  public static readonly EMBEDDED_NAME = 'stories';
  constructor(http: Http) {
    super(http, StoryService.EMBEDDED_NAME);
  }
  public getAllByPage(): Observable<Story> {
    return this._getAllByPage().map(o => Story.create(o));
  }
  public getAll(): Observable<Story> {
    return this._getAll().map(o => Story.create(o));
  }
  public getOne(id: string): Observable<Story> {
    return this._getOne(id).map(o => Story.create(o));
  }
}
