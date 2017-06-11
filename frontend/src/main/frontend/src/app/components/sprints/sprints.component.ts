import { Component, OnInit, HostListener } from '@angular/core';
import { SprintService } from '../../services/sprint.service';
import { Sprint } from '../../models/sprint';
import { NewSprintComponent } from '../new-sprint/new-sprint.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html'
})
export class SprintsComponent implements OnInit {


  public sprints: Sprint[];
  constructor(private sprintService: SprintService,
    private modalService: NgbModal,
    private router: Router) {
    this.sprints = new Array<Sprint>();
  }

  ngOnInit() {
    this.sprintService.getAllByPage().subscribe(v => {
      this.sprints.push(v);
    });
  }

  add() {
    Observable.fromPromise(
      this.modalService.open(NewSprintComponent).result)//
      .flatMap(s => this.sprintService.save(s))//
      .subscribe((sprint) => {
        this.sprints.unshift(sprint);
      });
  }

  save(sprint: Sprint) {
    this.sprintService.save(sprint)//
      .subscribe((s) => {
        this.replace(s);
      });
  }

  cancel(sprint: Sprint) {
    this.replace(sprint);
  }

  selectMore(sprint: Sprint) {
    this.router.navigate(['/sprint', sprint.id]);
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.sprintService.loadMore();
    }
  }


  private replace(sprint: Sprint) {
    const index = this.sprints.findIndex(s => s.id === sprint.id);
    if (index !== -1) {
      this.sprints[index] = sprint;
    }
  }
}
