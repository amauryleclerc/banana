import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Project } from '../models/project';
import { AbstractRestClientService } from './abstract-rest-client.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProjectService extends AbstractRestClientService<Project>  {

  public static readonly EMBEDDED_NAME = 'projects';
  constructor(http: Http) {
    super(http, ProjectService.EMBEDDED_NAME);
  }
  public getAllByPage(): Observable<Project> {
    return this._getAllByPage().map(o => Project.create(o));
  }
  public getAll(): Observable<Project> {
    return this._getAll().map(o => Project.create(o));
  }
  public getOne(id: string): Observable<Project> {
    return this._getOne(id).map(o => Project.create(o));
  }

  public save(project: Project): Observable<Project> {
    return this._save(project);
  }
}
