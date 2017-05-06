import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invitation } from '../Invitation';
import { InvitationService } from '../../../services/invitation.service';
import { Event } from '../../event/event';

@Component({
    selector: 'es-event-invitation-item',
    templateUrl: './event-invitation-item.component.html',
    styleUrls: ['./event-invitation-item.component.css']
})
export class EventInvitationItemComponent {

    @Input() event: Event;
    @Input() invitation: Invitation;

    @Output() deleted: EventEmitter<any> = new EventEmitter<any>();

    removed = false;

    constructor(private invitations: InvitationService) { }

    public remove(event: number, id: number): void
    {
        console.log(this.invitation);

        this.invitations.remove(event, id, () => {
            console.info('Removed invitation: ' + id);

            for (let i = 0; i < this.event.invitations.length; i++)
            {
                if (this.event.invitations[i].getInvitationID() == id)
                {
                    this.event.invitations.splice(i, 1);
                    break;
                }
            }

            this.deleted.emit();
            this.removed = true;
        }, () => {
            console.error('Couldn\'t remove invitation: ' + id);
        });
    }

}
