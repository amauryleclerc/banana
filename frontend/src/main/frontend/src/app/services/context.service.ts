import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint';
import { Story } from '../models/story';
import { StoryService } from './story.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ContextService {

    private sprintSelected: Subject<Sprint> = new BehaviorSubject(null);


    constructor() {
    }

    public getSelectedSprint(): Observable<Sprint> {
        return this.sprintSelected.asObservable()//
            .filter(sprint => sprint !== null)//
            .distinctUntilChanged();
         //   return Observable.empty();
    }

    public setSelectedSprint(sprint: Sprint) {
        this.sprintSelected.next(sprint);
    }

}
