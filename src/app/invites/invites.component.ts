import { Component, OnInit } from '@angular/core';
import { Invitation } from '../events/event-invitations/Invitation';
import { InvitationService } from '../services/invitation.service';

@Component({
    selector: 'es-invites',
    templateUrl: './invites.component.html',
    styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

    invites: Invitation[] = [];
    titles: string[] = [];

    constructor(private invitationService: InvitationService) {
    }

    ngOnInit() {
        this.fetchInvitations();
    }

    setGoing(index: number, going: boolean)
    {
        const invitation: Invitation = this.invites[index];

        if (going)
        {
            this.invitationService.accept(invitation.getEventID(), invitation.getInvitationID(), () => {
                this.fetchInvitations();
            }, this.logError);
        }
        else
        {
            this.invitationService.decline(invitation.getEventID(), invitation.getInvitationID(), () => {
                this.fetchInvitations();
            }, this.logError);
        }
    }

    fetchInvitations() {
        this.invitationService.fetchInvitations((invitations: Invitation[], titles: string[]) => {
            this.invites = invitations;
            this.titles = titles;
        });
    }

    private logError() {
        console.error('An error occurred while fetching invitations');
    }

}
