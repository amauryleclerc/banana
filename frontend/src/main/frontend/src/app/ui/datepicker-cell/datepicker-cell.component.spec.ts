import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerCellComponent } from './datepicker-cell.component';

describe('DatepickerCellComponent', () => {
  let component: DatepickerCellComponent;
  let fixture: ComponentFixture<DatepickerCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
