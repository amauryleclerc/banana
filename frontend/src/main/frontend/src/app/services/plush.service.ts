import { Injectable } from '@angular/core';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs/Rx';
import { PlushState } from '../models/plush-state';

@Injectable()
export class PlushService {

    private plushObs: Observable<PlushState>;
    private plushStates: Array<PlushState>;
    constructor(private stompService: StompService) {
        this.plushStates = new Array();
    }

    public getPlushs(): Observable<PlushState> {
        if (this.plushObs == null) {
            this.plushObs = this.stompService.subscribe('/plush/states')//
                .map(m => PlushState.createFromArray(JSON.parse(m.body)))//
                .flatMap(plushs => Observable.from(plushs))//
                .share();
            this.plushObs.subscribe(m => this.addOrReplace(m), e => console.error(e));
        }
        return Observable.concat(Observable.from(this.plushStates), this.plushObs);
    }

    public take(plush: PlushState) {
        this.stompService.publish('/plush/take', JSON.stringify(plush));
    }

    public release(plush: PlushState) {
        this.stompService.publish('/plush/release', JSON.stringify(plush));
    }

    private addOrReplace(plush: PlushState): void {
        const index = this.plushStates.findIndex(s => s.plush.id === plush.plush.id);
        if (index !== -1) {
            this.plushStates[index] = plush;
        } else {
            this.plushStates.push(plush);
        }
    }

}