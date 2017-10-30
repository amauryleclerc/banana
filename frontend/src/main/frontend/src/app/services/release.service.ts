import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Release } from '../models/release';
import { Observable } from 'rxjs/Rx';
import { AbstractRestClientService } from './abstract-rest-client.service';

@Injectable()
export class ReleaseService extends AbstractRestClientService<Release>  {

    public static readonly EMBEDDED_NAME = 'releases';

    constructor(private http: Http) {
        super(http, ReleaseService.EMBEDDED_NAME);
    }

    public getAllByPage(): Observable<Release> {
        return this._getAllByPage().map(o => Release.create(o));
    }
    public getAll(): Observable<Release> {
        return this._getAll().map(o => Release.create(o));
    }
    public getOne(id: string): Observable<Release> {
        return this._getOne(id).map(o => Release.create(o));
    }
    public save(release: Release): Observable<Release> {
        //   let copy = {...sprint};
        // copy.stories = null;
        return this._save(Release.create(release));
    }

}