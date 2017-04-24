import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitationItemComponent } from './event-invitation-item.component';

describe('EventInvitationItemComponent', () => {
  let component: EventInvitationItemComponent;
  let fixture: ComponentFixture<EventInvitationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInvitationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInvitationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
