import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {InvitationService} from '../../../services/invitation.service';
import {Invitation} from '../Invitation';
import {Event} from '../../event/event';
import {User} from '../../../user/user';

@Component({
  selector: 'es-event-invitation-search-result',
  templateUrl: './event-invitation-search-result.component.html',
  styleUrls: ['./event-invitation-search-result.component.css']
})
export class EventInvitationSearchResultComponent {

    @Input() event: Event;
    @Input() user: User;

    @Output() created: EventEmitter<any> = new EventEmitter<any>();

    added = false;

    constructor(private invitations: InvitationService) { }

    public invite()
    {
        this.invitations.create(this.event.id, this.user, (invitation: Invitation) => {

            this.event.invitations.push(invitation);

            this.added = true;
            this.created.emit();

            console.info('Created invitation');

        }, () => {

            console.error('Could\'t create invitation for user: ' + this.user.getID());

        });
    }

}
