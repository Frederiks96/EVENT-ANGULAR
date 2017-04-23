import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitationsComponent } from './event-invitations.component';

describe('EventInvitationsComponent', () => {
  let component: EventInvitationsComponent;
  let fixture: ComponentFixture<EventInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
