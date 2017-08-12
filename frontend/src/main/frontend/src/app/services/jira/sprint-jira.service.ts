
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Sprint } from '../../models/sprint';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SprintJiraService {


    constructor(private http: HttpClient) {

    }

    public get(id: string): Observable<Sprint> {
        return this.http.get<Sprint>(this.getUrl() + '/sprint/' + id)
            .map(p => Sprint.create(p));
    }

    public getFromProject(id: string): Observable<Sprint> {
        return this.http.get<Array<Sprint>>(this.getUrl() + '/project/' + id + '/sprints')
            .flatMap(r => Observable.from(r))//
            .map(p => Sprint.create(p));
    }

    public import(id: string): Observable<string>{
        return this.http.get<string>(this.getUrl() + '/sprint/import/' + id);
    }

    public test(id: string): Observable<string>{
        return this.http.get<string>(this.getUrl() + '/sprint/test/' + id)
    }

    private getUrl(): string {
        return 'http://' + window.location.host + '/api/jira';
    }

}
