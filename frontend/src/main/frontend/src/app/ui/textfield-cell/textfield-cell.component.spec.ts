import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfieldCellComponent } from './textfield-cell.component';

describe('TextfieldCellComponent', () => {
  let component: TextfieldCellComponent;
  let fixture: ComponentFixture<TextfieldCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextfieldCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextfieldCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
