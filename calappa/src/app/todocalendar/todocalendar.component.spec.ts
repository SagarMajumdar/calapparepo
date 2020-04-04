import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodocalendarComponent } from './todocalendar.component';

describe('TodocalendarComponent', () => {
  let component: TodocalendarComponent;
  let fixture: ComponentFixture<TodocalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodocalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodocalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
