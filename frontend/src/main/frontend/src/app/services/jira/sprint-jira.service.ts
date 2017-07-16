
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Sprint } from '../../models/sprint';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SprintJiraService {


    constructor(private http: Http) {

    }

    public get(id: string): Observable<Sprint> {
        return this.http.get(this.getUrl() + '/sprint/' + id).flatMap(r => this.handleResponse(r));
    }

    public getFromProject(id: string): Observable<Sprint> {
        return this.http.get(this.getUrl() + '/project/' + id + '/sprints').flatMap(r => this.handleResponseArray(r));
    }

    public getUrl(): string {
        return 'http://' + window.location.host + '/api/jira';
    }

    private handleResponse(res: Response): Observable<Sprint> {
        if (res.status === 200 || res.status === 201) {
            const item: Sprint = Sprint.create(res.json());
            return Observable.of(item);
        }
        return Observable.empty();
    }
    protected handleResponseArray(res: Response): Observable<Sprint> {
        if (res.status === 200) {
            const items: Sprint[] = <Array<Sprint>>res.json();
            return Observable.from(items).map(i => Sprint.create(i));
        }
        return Observable.empty();
    }
}
