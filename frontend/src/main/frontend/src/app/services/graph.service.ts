import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint';
import { Story, StoryInSprint } from '../models/story';
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
    return Observable.combineLatest(this.contextService.getSelectedSprintId(), this.reloadSub, (id, r) => id)//
      .switchMap(id => this.sprintService.getOne(id));
  }

  public reload() {
    this.reloadSub.next(true);
  }

  public getXAxis(): Observable<any> {
    return this.getSprint()//
      .flatMap(sprint => sprint.getDates()//
        .bufferCount(2, 1)//
        .filter(dates => dates[0] != null && dates[1] != null)//
        .reduce((acc, dates) => {
          const firstIsWeekend: boolean = DateUtils.isWeekend(dates[0]);
          const secondIsWeekend: boolean = DateUtils.isWeekend(dates[1]);
          if (!firstIsWeekend && secondIsWeekend) {
            acc.push(Break.create(dates[1], dates[1]));
          } else if (firstIsWeekend && secondIsWeekend && acc.length === 0) {
            acc.push(Break.create(dates[0], dates[1]));
          } else if (firstIsWeekend && secondIsWeekend && acc.length >= 0) {
            acc[acc.length - 1].to = dates[1].getTime();
          } else if (firstIsWeekend && !secondIsWeekend && acc.length === 0) {
            acc.push(Break.create(dates[0], dates[1]));
          } else if (firstIsWeekend && !secondIsWeekend && acc.length >= 0) {
            acc[acc.length - 1].to = dates[1].getTime();
          }
          return acc;
        }, Array<Break>())//
        .withLatestFrom(this.contextService.getShowWeekend(), (breaks, showWeekend) => {
          if (showWeekend) {
            return [];
          }
          return breaks;
        })
        .map(breaks => {
          return {
            min: sprint.start.getTime(),
            max: sprint.end.getTime(),
            type: 'datetime',
            breaks: breaks
          };
        }));
  }

  public getComplexities(): Observable<Array<Point>> {
    return this.getSprint().switchMap(sprint => this.getFilteredDate(sprint)//
      .filter(date => date.getTime() <= DateUtils.getToday().getTime())//
      .map(date => {
        return new Point(date.getTime(), this.getComplexity(date, sprint.stories, sprint),
          new Label(this.getClosedStory(date, sprint)));
      }).toArray());

  }

  public getBonusComplexities(): Observable<Array<Point>> {
    return this.getSprint().switchMap(sprint => this.getFilteredDate(sprint)//
      .filter(date => date.getTime() <= DateUtils.getToday().getTime())//
      .map(date => {
        return new Point(date.getTime(), this.getBonusComplexity(date, sprint.stories, sprint),
          new Label(this.getBonusClosedStory(date, sprint)));
      }).toArray());
  }

  public getIdealComplexities(): Observable<Array<Point>> {
    return this.getSprint().switchMap(sprint =>
      sprint.getComplexityPerDay()//
        .flatMap(complexityPerDay => this.getFilteredDate(sprint)//
          .reduce((acc, date) => {
            if (acc.length === 0) {
              acc.push(new Point(date.getTime(), sprint.engagedComplexity, null));
              return acc;
            }
            const lastComplexity = acc[acc.length - 1].y;
            if (DateUtils.isWeekend(date)) {
              acc.push(new Point(date.getTime(), lastComplexity, null));
            } else {
              acc.push(new Point(date.getTime(), lastComplexity - complexityPerDay, null));
            }
            return acc;
          }, new Array<Point>())//
        )
    )
  }

  private getComplexity(date: Date, stories: Array<StoryInSprint>, sprint: Sprint): number {
    return stories.filter((story) => {
      return this.isCommitedStory(story, sprint) && !this.isStoryClosed(date, story);
    }).map((story) => {
      return story.story.complexity;
    }).reduce((acc, complexity) => {
      return acc + complexity;
    }, 0);
  }

  private getClosedStory(date: Date, sprint: Sprint): string {
    return sprint.stories//
      .filter((story) => this.isCommitedStory(story, sprint))
      .filter(story => story.story.closeDate != null)
      .filter((story) => Math.abs(story.story.closeDate.getTime() - date.getTime()) < 6000000)
      .map((story) => story.story.name)
      .reduce((acc, name) => {
        if (acc === '') {
          return name;
        }
        return acc + ', ' + name;
      }, '');
  }

  private getBonusClosedStory(date: Date, sprint: Sprint): string {
    return sprint.stories//
      .filter((story) => this.isBonusStory(story, sprint, date))
      .filter(story => story.story.closeDate != null)
      .filter((story) => Math.abs(story.story.closeDate.getTime() - date.getTime()) < 6000000)
      .map((story) => story.story.name)
      .reduce((acc, name) => {
        if (acc === '') {
          return name;
        }
        return acc + ', ' + name;
      }, '');
  }



  private getBonusComplexity(date: Date, stories: Array<StoryInSprint>, sprint: Sprint): number {
    return stories.filter((story) => {
      return !this.isStoryClosed(date, story) && (this.isCommitedStory(story, sprint) || this.isBonusStory(story, sprint, date));
    }).map((story) => {
      return story.story.complexity;
    }).reduce((acc, complexity) => {
      return acc + complexity;
    }, 0);
  }

  private isCommitedStory(story: StoryInSprint, sprint: Sprint): boolean {
    return DateUtils.dayDiff(story.added, sprint.start) >= 0;
  }

  private isStoryClosed(date: Date, story: StoryInSprint): boolean {
    return story.story.closeDate != null && DateUtils.dayDiff(story.story.closeDate, date) >= 0;
  }
  private isBonusStory(story: StoryInSprint, sprint: Sprint, date: Date) {
    return DateUtils.dayDiff(sprint.start, story.added) > 0 && (story.added == null || DateUtils.dayDiff(story.added, date) >= 0);
  }

  private getFilteredDate(sprint: Sprint): Observable<Date> {
    return sprint.getDates()//
      .withLatestFrom(this.contextService.getShowWeekend(), (date, showWeekend) => {
          const tuple = { 'date': date, 'showWeekend': showWeekend };
          return tuple;
        })
      .filter(tuple => <boolean>tuple.showWeekend || !DateUtils.isWeekend(tuple.date))//
      .map(tuple => tuple.date);
  }

}


export class Break {

  public from: number;
  public to: number;

  public static create(from: Date, to: Date): Break {
    return new Break(from.getTime(), to.getTime(), 0);
  }



  constructor(from: number, to: number, public breakSize: number) {
    this.from = from + 1000 * 60 * 60 * 2;
    this.to = to + 1000 * 60 * 60 * 2;
  }

}

export class Point {

  public x: number;
  public y: number;
  constructor(x: number, y: number, public dataLabels: Label) {
    this.x = x + 1000 * 60 * 60 * 2;
    this.y = y;
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
