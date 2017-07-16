
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Project } from '../../models/project';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProjectJiraService {


    constructor(private http: Http) {

    }

    public get(id: string): Observable<Project> {
        return this.http.get(this.getUrl() + '/' + id).flatMap(r => this.handleResponse(r));
    }

    public getAll(): Observable<Project> {
        return this.http.get(this.getUrl()).flatMap(r => this.handleResponseArray(r));
    }

    private getUrl(): string {
        return 'http://' + window.location.host + '/api/jira/project';
    }

    private handleResponse(res: Response): Observable<Project> {
        if (res.status === 200 || res.status === 201) {
            const item: Project = Project.create(res.json());
            return Observable.of(item);
        }
        return Observable.empty();
    }
    protected handleResponseArray(res: Response): Observable<Project> {
        if (res.status === 200) {
            const items: Project[] = <Array<Project>>res.json();
            return Observable.from(items).map(i => Project.create(i));
        }
        return Observable.empty();
    }
}