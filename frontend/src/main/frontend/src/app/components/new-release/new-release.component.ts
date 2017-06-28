import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Release } from '../../models/release';
import { DateUtils } from '../../services/date.service';

@Component({
    selector: 'app-new-release',
    templateUrl: './new-release.component.html'
})
export class NewReleaseComponent implements OnInit {

    public release: Release;

    constructor(private activeModal: NgbActiveModal) {
        this.release = Release.create();
    }

    ngOnInit() {
    }

    save() {
        this.activeModal.close(this.release);
    }

    cancel() {
        this.activeModal.dismiss('cancel');
    }
}