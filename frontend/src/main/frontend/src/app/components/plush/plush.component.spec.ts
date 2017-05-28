import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlushComponent } from './plush.component';

describe('PlushComponent', () => {
  let component: PlushComponent;
  let fixture: ComponentFixture<PlushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
