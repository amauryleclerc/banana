
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../models/project';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProjectJiraService {


    constructor(private http: HttpClient) {

    }

    public get(id: string): Observable<Project> {
        return this.http.get<Project>(this.getUrl() + '/' + id)//
            .map(p => Project.create(p));
    }

    public getAll(): Observable<Project> {
        return this.http.get<Array<Project>>(this.getUrl())//
            .flatMap(r => Observable.from(r))//
            .map(p => Project.create(p));
    }

    private getUrl(): string {
        return 'http://' + window.location.host + '/api/jira/project';
    }

}
