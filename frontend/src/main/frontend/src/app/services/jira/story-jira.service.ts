
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Story } from '../../models/story';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StoryJiraService {


    constructor(private http: HttpClient) {

    }

    public get(id: string): Observable<Story> {
        return this.http.get<Story>(this.getUrl() + '/story/' + id)
            .map(p => Story.create(p));
    }

    public getFromSprint(id: string): Observable<Story> {
        return this.http.get<Array<Story>>(this.getUrl() + '/sprint/' + id + '/stories')
            .flatMap(r => Observable.from(r))//
            .map(p => Story.create(p));
    }

    private getUrl(): string {
        return 'http://' + window.location.host + '/api/jira';
    }

}
