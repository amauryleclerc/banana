import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxCellComponent } from './combobox-cell.component';

describe('ComboboxCellComponent', () => {
  let component: ComboboxCellComponent;
  let fixture: ComponentFixture<ComboboxCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboboxCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
