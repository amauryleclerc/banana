import { Component, OnInit, HostListener } from '@angular/core';
import { ReleaseService } from '../../services/release.service';
import { Release } from '../../models/release';
import { NewReleaseComponent } from '../new-release/new-release.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-releases',
    templateUrl: './releases.component.html'
})
export class ReleasesComponent implements OnInit {

    public releases: Release[];

    constructor(private releaseService: ReleaseService,//
        private modalService: NgbModal,//
        private router: Router) {
        this.releases = new Array<Release>();
    }

    ngOnInit() {
        this.releaseService.getAllByPage()//
            .subscribe(v => this.releases.push(v));
    }

    add() {
        Observable.fromPromise(
            this.modalService.open(NewReleaseComponent).result)//
            .flatMap(s => this.releaseService.save(s))//
            .subscribe(release => this.releases.unshift(release));
    }

    save(release: Release) {
        // TODO
    }

    cancel(release: Release) {
        // TODO
    }

    selectMore(release: Release) {
        this.router.navigate(['/release', release.id]);
    }

}