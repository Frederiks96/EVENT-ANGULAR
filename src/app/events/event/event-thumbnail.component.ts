import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Event } from './event';
import { InvitationService } from '../../services/invitation.service';
import { Invitation } from '../event-invitations/Invitation';
import { UserService } from "../../services/user.service";

@Component({
    selector: 'es-event-thumbnail',
    templateUrl: 'event-thumbnail.component.html',
    styleUrls: ['event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {

    @Input() event: Event;
    @Input() isGoing: boolean = false;
    @Output() statusUpdated = new EventEmitter<Event>();
    invitation: Invitation;
    user = this.userService.getCurrentUser();

    constructor(private invitationService: InvitationService, private userService: UserService) { }

    ngOnInit() {
        if (this.isOrganizer()) {
            this.isGoing = true;
            return;
        }
        this.fetchInvitation();
    }

    onGoing() {

        if (this.isOrganizer()) {
            this.isGoing = true;
            return;
        }

        if (this.invitation != null) {
            // User is invited
            if (this.invitation.isAccepted()) {
                return;
            }
            this.invitationService.accept(this.event.getId(), this.invitation.getInvitationID(), () => {
                this.isGoing = true;
                this.fetchInvitation();
            }, () => {});
            this.statusUpdated.emit(this.event);
            return;
        }

        if (this.event.isPublic) {
            this.invitationService.create(this.event.getId(), this.user, (invitation) => {
                this.isGoing = true;
                this.fetchInvitation();
            }, () => {} );
            this.statusUpdated.emit(this.event);
        }
    }

    private isOrganizer()
    {
        for (let organiser of this.event.organizers)
        {
            if (this.user.getID() === organiser.getID())
            {
                return true;
            }
        }

        return false;
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
