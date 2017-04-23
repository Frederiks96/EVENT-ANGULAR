import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {InvitationService} from "../../../services/invitation-service.service";
import {Invitation} from "../../../models/Invitation";
import {Event} from "../../event/event";

@Component({
  selector: 'es-event-invitation-search-result',
  templateUrl: './event-invitation-search-result.component.html',
  styleUrls: ['./event-invitation-search-result.component.css']
})
export class EventInvitationSearchResultComponent {

    @Input() public event : Event;
    @Input() public user  : User;

    constructor(private invitations : InvitationService) { }

    public invite()
    {
        this.invitations.create(this.event.id, this.user, (invitation : Invitation) => {

            console.info('Created invitation');

        }, () => {

            console.error('Could\'t create invitation for user: ' + this.user.getID());

        });
    }

}
