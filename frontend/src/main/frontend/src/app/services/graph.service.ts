import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint';
import { Story } from '../models/story';
import { ContextService } from './context.service';
import { SprintService } from './sprint.service';
import { DateUtils } from './date.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class GraphService {


  private currentSprint: Sprint;

  private reloadSub: Subject<boolean>;
  constructor(private contextService: ContextService, private sprintService: SprintService) {
    this.reloadSub = new BehaviorSubject(true);
  }

  public getTitle(): Observable<string> {
    return this.getSprint()//
      .map(sprint => sprint.name);
  }

  public getDates(): Observable<Date> {
    return this.getSprint()//
      .flatMap((sprint: Sprint) => sprint.getDates());
  }

  public getSprint(): Observable<Sprint> {
    return Observable.combineLatest(this.contextService.getSelectedSprint(), this.reloadSub, (s, r) => s)//
      .switchMap(s => this.sprintService.getOne(s.id));
  }

  public reload() {
    this.reloadSub.next(true);
  }

  public getXAxis(): Observable<any> {
    return this.getSprint()//
      .map(sprint => {
        return {
          min: sprint.start.getTime(),
          max: sprint.end.getTime(),
          type: 'datetime'
        };
      });
  }

  public getComplexities(): Observable<Array<Point>> {
    return this.getSprint().switchMap(sprint => sprint.getDates()//
      .filter(date => date.getTime() <= DateUtils.getToday().getTime())//
      .map(date => {
        return new Point(date.getTime(), this.getComplexity(date, sprint.stories.map(s => s.story), sprint),
          new Label(this.getClosedStory(date, sprint.stories.map(s => s.story))));
      }).toArray());

  }

  public getBonusComplexities(): Observable<Array<Array<number>>> {
    return this.getSprint().switchMap(sprint => sprint.getDates()//
      .filter(date => date.getTime() <= DateUtils.getToday().getTime())//
      .map(date => [date.getTime(), this.getBonusComplexity(date, sprint.stories.map(s => s.story), sprint)])//
    ).toArray();

  }
  public getIdealComplexities(): Observable<Array<Array<number>>> {
    return this.getSprint().switchMap(sprint =>
      sprint.getComplexityPerDay()//
        .flatMap(complexityPerDay => sprint.getDates()//
          .reduce((acc, date) => {
            if (acc.length === 0) {
              acc.push([date.getTime(), sprint.engagedComplexity]);
              return acc;
            }
            const lastComplexity = acc[acc.length - 1][1];
            if (DateUtils.isWeekend(date)) {
              acc.push([date.getTime(), lastComplexity]);
            } else {
              acc.push([date.getTime(), lastComplexity - complexityPerDay]);
            }
            return acc;
          }, new Array<Array<number>>())//
        )
    )
  }

  private getComplexity(date: Date, stories: Array<Story>, sprint: Sprint): number {
    return stories.filter((story) => {
      return this.isCommitedStory(story, sprint) && !this.isStoryClosed(date, story);
    }).map((story) => {
      return story.complexity;
    }).reduce((acc, complexity) => {
      return acc + complexity;
    }, 0);
  }

  private getClosedStory(date: Date, stories: Array<Story>): string {

    return stories.filter(story => story.closeDate != null
    ).filter((story) => {
      return Math.abs(story.closeDate.getTime() - date.getTime()) < 6000000;
    }).map((story) => {
      return story.name;
    }).reduce((acc, complexity) => {
      return acc + ' ' + complexity;
    }, '');
  }


  private getBonusComplexity(date: Date, stories: Array<Story>, sprint: Sprint): number {
    return stories.filter((story) => {
      return !this.isStoryClosed(date, story) && (this.isCommitedStory(story, sprint) || this.isBonusStory(story, sprint, date));
    }).map((story) => {
      return story.complexity;
    }).reduce((acc, complexity) => {
      return acc + complexity;
    }, 0);
  }

  private isCommitedStory(story: Story, sprint: Sprint): boolean {
    return DateUtils.dayDiff(story.addDate, sprint.start) >= 0;
  }

  private isStoryClosed(date: Date, story: Story): boolean {
    return story.closeDate != null && DateUtils.dayDiff(story.closeDate, date) >= 0;
  }
  private isBonusStory(story: Story, sprint: Sprint, date: Date) {
    return DateUtils.dayDiff(sprint.start, story.addDate) > 0 && (story.addDate == null || DateUtils.dayDiff(story.addDate, date) >= 0);
  }

}

export class Point {

  constructor(public x: number, public y: number, public dataLabels: Label) {

  }

}

export class Label {
  public enabled: any = false;
  constructor(public format: string) {
    if (format !== '') {
      this.enabled = true;
    }
  }

}
