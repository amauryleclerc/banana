import { Component, OnInit, Input, Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbDatepicker, NgbDateStruct, NgbDateParserFormatter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateMomentParserFormatter} from '../../services/date.service';
import * as moment from 'moment';

export function NgbDateMomentParserFormatterFactory(): NgbDateParserFormatter {
  return new NgbDateMomentParserFormatter('DD/MM/YYYY'); 
}

@Component({
  selector: 'datepicker-cell',
  templateUrl: './datepicker-cell.component.html',
  styleUrls: ['./datepicker-cell.component.css'],
  providers: [{
    provide: NgbDateParserFormatter,
    useFactory: NgbDateMomentParserFormatterFactory
  }]
})
export class DatepickerCellComponent implements OnInit {

  private static listeners: DatepickerCellComponent[] = new Array<DatepickerCellComponent>();

  @Input() id: any;
  @Input() date: Date;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter();

  model: NgbDateStruct;

  @ViewChild('datePickerInput')
  datePickerInput: NgbInputDatepicker;

  isEditing: boolean;

  constructor() {
    DatepickerCellComponent.listeners.push(this);
  }

  ngOnInit() {
    if (this.date != null) {
      const date: Date = new Date(this.date);
      date.setHours(0, 0, 0, 0);
      this.model = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }
    this.isEditing = false;
  }

  @Input()
  set selectedId(selectedId: any) {
    this.isEditing = (selectedId === this.id);
  }
  onChange(date: NgbDateStruct) {
    this.date = new Date(date.year, date.month - 1, date.day);
    this.date.setHours(0, 0, 0, 0);
    this.dateChange.emit(this.date);
  }

  toggle(){
    this.datePickerInput.toggle();
     DatepickerCellComponent.listeners//
      .filter(l => l !== this)//
      .forEach(l => l.close());
  }

  close() {
    if (this.datePickerInput != null){
        this.datePickerInput.close();
    }
  }

}
