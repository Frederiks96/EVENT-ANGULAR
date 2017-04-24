import { Component, OnInit } from '@angular/core';
import {InvitationService} from "../services/invitation-service.service";
import {Invite} from "./invite";
import {EventService} from "../services/event.service";

@Component({
    selector: 'es-invites',
    templateUrl: './invites.component.html',
    styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

    private invites: Invite[] = [];
    private titles: string[] = [];

    constructor(private invitationService: InvitationService, private eventService: EventService) {
    }

    ngOnInit() {
        this.invitationService.fetchInvitations((invitations: Invite[], titles: string[]) => {
            this.invites = invitations;
            this.titles = titles;
        });
    }

    setGoing(index: number, going: boolean) {
        // Set going
        //this.invites[index].setGoing(going);
        going ? console.debug('Going') : console.debug('Not going');
    }

}
