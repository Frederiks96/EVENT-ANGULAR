import {Component, OnInit, OnDestroy} from '@angular/core';
import { Event } from '../event/event';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {EventService} from '../../services/event.service';
import {Subscription} from 'rxjs';
import {User} from '../../user/user';
import {APIService} from '../../services/api.service';
import {Invitation} from '../event-invitations/Invitation';
import {InvitationService} from '../../services/invitation.service';


@Component({
  selector: 'es-show-event',
  templateUrl: 'show-event.component.html',
  styleUrls: ['show-event.component.css']
})
export class ShowEventComponent implements OnInit, OnDestroy {

    event: Event = null;
    id: number;
    subscription: Subscription;

    isCurrentUserOrganizer : boolean = false;
    hasCurrentUserInvitePending : boolean = false;
    isCurrentUserAttending : boolean = false;

    invitationID : number = 0;

    constructor(private route: ActivatedRoute, private eventService: EventService, private api : APIService, private invitations : InvitationService, private router : Router) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.eventService.getEvent(this.id, (event: Event) => {
            this.event = event;

            this.updateState();
        }, () => {
            console.error('Couldn\'t fetch event with ID: ' + this.id);
        });

        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.id = params['id'];
                this.eventService.getEvent(this.id, (event: Event) => {
                    this.event = event;
                }, null);
            }
        );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onAcceptInvitation()
    {
        this.invitations.accept(this.event.id, this.invitationID, () => {
           console.info('Accepted invitation: ' + this.invitationID);
        }, () => {
            console.error('Couldn\'t accept invitation: ' + this.invitationID);
        });

        this.hasCurrentUserInvitePending = false;
    }

    public onDeclineInvitation()
    {
        this.invitations.decline(this.event.id, this.invitationID, () => {
            console.info('Declined invitation: ' + this.invitationID);
        }, () => {
            console.error('Couldn\'t decline invitation: ' + this.invitationID);
        });

        this.hasCurrentUserInvitePending = false;
        this.isCurrentUserAttending = false;
    }

    public deleteEvent()
    {
        this.eventService.deleteEvent(this.event.id, () => {
            this.router.navigate(['/events']);
        }, null);
    }

    private updateState() : void
    {
        let user : User = this.api.getCurrentUser();

        console.debug(user);
        console.debug(this.event.organizers);

        /*
         * Check if the currently signed in user is an organizer of the event.
         */
        for(let index : number = 0; index < this.event.organizers.length; index++)
        {
            if(this.event.organizers[index].getID() == user.getID())
            {
                this.isCurrentUserOrganizer = true;
            }
        }

        /*
         * Check if the currently signed in user has an invitation pending on the event.
         */
        if(!this.isCurrentUserOrganizer)
        {
            for(let index : number = 0; index < this.event.invitations.length; index++)
            {
                let invitation : Invitation = this.event.invitations[index];

                if(invitation.getUser().getID() == user.getID())
                {
                    this.invitationID = invitation.getInvitationID()

                    if(!invitation.isAccepted())
                    {
                        this.hasCurrentUserInvitePending = true;
                    }
                    else
                    {
                        this.isCurrentUserAttending = true;
                    }
                }
            }
        }
    }

}
