import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitationSearchResultComponent } from './event-invitation-search-result.component';

describe('EventInvitationSearchResultComponent', () => {
  let component: EventInvitationSearchResultComponent;
  let fixture: ComponentFixture<EventInvitationSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInvitationSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInvitationSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
