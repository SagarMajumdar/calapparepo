import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtmoyrselectorComponent } from './dtmoyrselector.component';

describe('DtmoyrselectorComponent', () => {
  let component: DtmoyrselectorComponent;
  let fixture: ComponentFixture<DtmoyrselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtmoyrselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtmoyrselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
