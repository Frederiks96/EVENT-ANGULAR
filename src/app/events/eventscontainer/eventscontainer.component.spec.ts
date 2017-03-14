import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventscontainerComponent } from './eventscontainer.component';

describe('EventscontainerComponent', () => {
  let component: EventscontainerComponent;
  let fixture: ComponentFixture<EventscontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventscontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
