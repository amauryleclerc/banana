import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint';
import { Story } from '../models/story';
import { StoryService } from './story.service';
import { SprintService } from './sprint.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class ContextService {

    private sprintSelected: Subject<string> = new BehaviorSubject(null);


    constructor(private localStorageService: LocalStorageService, private sprintService: SprintService) {
        const selectedSprintId = this.localStorageService.get<string>('selectedSprintId');
        if (selectedSprintId != null) {
            this.sprintSelected.next(selectedSprintId);
        }
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

}
