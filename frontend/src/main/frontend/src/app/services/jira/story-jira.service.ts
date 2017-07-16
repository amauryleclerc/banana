
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Story } from '../../models/story';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StoryJiraService {


    constructor(private http: Http) {

    }

    public get(id: string): Observable<Story> {
        return this.http.get(this.getUrl() + '/story/' + id).flatMap(r => this.handleResponse(r));
    }

    public getFromSprint(id: string): Observable<Story> {
        return this.http.get(this.getUrl() + '/sprint/' + id + '/stories').flatMap(r => this.handleResponseArray(r));
    }

    public getUrl(): string {
        return 'http://' + window.location.host + '/api/jira';
    }

    private handleResponse(res: Response): Observable<Story> {
        if (res.status === 200 || res.status === 201) {
            const item: Story = Story.create(res.json());
            return Observable.of(item);
        }
        return Observable.empty();
    }
    protected handleResponseArray(res: Response): Observable<Story> {
        if (res.status === 200) {
            const items: Story[] = <Array<Story>>res.json();
            return Observable.from(items).map(i => Story.create(i));
        }
        return Observable.empty();
    }
}