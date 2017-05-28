import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Injectable()
export class NgbDateMomentParserFormatter extends NgbDateParserFormatter {
    constructor(private momentFormat: string) {
        super();
    };
    format(date: NgbDateStruct): string {
        if (date === null) {
            return '';
        }
        let d = moment({
            year: date.year,
            month: date.month - 1,
            date: date.day
        });
        return d.isValid() ? d.format(this.momentFormat) : '';
    }

    parse(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        let d = moment(value, this.momentFormat);
        console.log({
            year: d.year(),
            month: d.month() + 1,
            day: d.date()
        });
        return d.isValid() ? {
            year: d.year(),
            month: d.month() + 1,
            day: d.date()
        } : null;
    }
}

export abstract class DateUtils {

    public static dayDiff(start: Date, end: Date): number {
        if (start === null || end === null) {
            return 0;
        }
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    }

    public static getDateIfPresent(date: any): Date {
        if (date !== null) {
            const result: Date = new Date(date);
            result.setHours(0, 0, 0, 0);
            return result;
        }
        return null;
    }

    public static isWeekend(date: Date): boolean{
        return (date.getDay() === 6) || (date.getDay() === 0);
    }
}
