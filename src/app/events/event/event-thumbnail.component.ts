import {Component, Input, OnInit} from '@angular/core';
import { Event } from './event';
import {Router} from '@angular/router';
import {InvitationService} from "../../services/invitation.service";
import {APIService} from "../../services/api.service";
import {Invitation} from "../event-invitations/Invitation";

@Component({
  selector: 'es-event-thumbnail',
  templateUrl: 'event-thumbnail.component.html',
  styleUrls: ['event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {

  @Input() event: Event;
  private isGoing: boolean = false;
  private invitation: Invitation;
  private user = this.apiService.getCurrentUser();


  constructor(private router: Router, private invitationService: InvitationService, private apiService: APIService) { }



  ngOnInit() {
      console.log(this.event);
      if (this.isOrganizer()) {
          this.isGoing = true;
          return;
      }
      this.fetchInvitation();
  }

  onGoing() {

      if (this.isOrganizer()) {
          // Current user is organizer
          return;
      }

      if (this.invitation != null) {
          // User is invited
          if (this.invitation.isAccepted()){
              return;
          }
          this.invitationService.accept(this.event.getId(), this.invitation.getInvitationID(), () => {
              this.isGoing = true;
              this.fetchInvitation();
          }, () => {});
          return;
      }

      if (this.event.isPublic) {
          this.invitationService.create(this.event.getId(), this.user, (invitation) => {
              this.isGoing = true;
              this.fetchInvitation();
          }, () => {} );
      }
  }

  private isOrganizer() {
      return this.event.organizers.indexOf(this.user) !== -1;
  }

  private fetchInvitation() {
      this.invitationService.fetchInvitation(this.event.getId(), (invitation) => {
          this.invitation = invitation;
          if (this.invitation != null) {
              this.isGoing = this.invitation.isAccepted();
          }
      });
  }

}
