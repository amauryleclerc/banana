import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint';
import { Story } from '../models/story';
import { StoryService } from './story.service';
import { SprintService } from './sprint.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class ContextService {

    private sprintSelected: Subject<string> = new BehaviorSubject(null);
    private viewSelected: Observable<string>;

    constructor(private localStorageService: LocalStorageService,
        private sprintService: SprintService,
        private router: Router) {
        const selectedSprintId = this.localStorageService.get<string>('selectedSprintId');
        if (selectedSprintId != null) {
            this.sprintSelected.next(selectedSprintId);
        }
        this.viewSelected = router.events
            .filter(evt => evt instanceof NavigationEnd)
            .map((evt: NavigationEnd) => evt.url)
            .map(url => url.substring(1))
            .map(url => {
                const index = url.indexOf('/');
                if (index !== -1) {
                    return url.substring(0, index);
                }
                return url;
            }).shareReplay(1);
    }

    public getSelectedSprintId(): Observable<string> {
        return this.sprintSelected.asObservable()//
            .filter(sprint => sprint !== null)//
            .distinctUntilChanged((a, b) => a === b);
    }

    public setSelectedSprint(sprint: string) {
        this.sprintSelected.next(sprint);
        if (sprint != null) {
            this.localStorageService.set('selectedSprintId', sprint);
        }
    }

    public getViewSelected(): Observable<string> {
        return this.viewSelected;
    }

}
