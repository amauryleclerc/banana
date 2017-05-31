import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbDatepicker, NgbDateStruct, NgbDateParserFormatter, NgbInputDatepicker  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateMomentParserFormatter } from '../../services/date.service';
import * as moment from 'moment';

export function NgbDateMomentParserFormatterFactory(): NgbDateParserFormatter {
  return new NgbDateMomentParserFormatter('DD/MM/YYYY'); 
}
@Component({
  selector: 'datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.css'],
  providers: [{
    provide: NgbDateParserFormatter,
    useFactory: NgbDateMomentParserFormatterFactory
  }]
})
export class DatepickerInputComponent implements OnInit {

  private static listeners: DatepickerInputComponent[] = new Array<DatepickerInputComponent>();

  @Input() date: Date;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter();

  model: NgbDateStruct;

  @ViewChild('datePickerInput')
  datePickerInput: NgbInputDatepicker;

  constructor() {
    DatepickerInputComponent.listeners.push(this);
  }

  ngOnInit() {
    if (this.date != null) {
      const date: Date = new Date(this.date);
      date.setHours(0, 0, 0, 0);
      this.model = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
  }

  onChange(date: NgbDateStruct) {
    this.date = new Date(date.year, date.month - 1, date.day);
    this.date.setHours(0, 0, 0, 0);
    this.dateChange.emit(this.date);
  }

  toggle(){
    this.datePickerInput.toggle();
     DatepickerInputComponent.listeners//
      .filter(l => l !== this)//
      .forEach(l => l.close());
  }

  close() {
    this.datePickerInput.close();
  }
}




