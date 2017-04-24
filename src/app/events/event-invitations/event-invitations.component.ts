import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}    from "@angular/router";

import { Event } from '../event/event';
import { User }  from "../../user/user";
import { UserService } from "../../services/user.service";
import {Invitation} from "./Invitation";
import {EventService} from "../../services/event.service";
import {APIService} from "../../services/api.service";
import {isNumber} from "util";

@Component({
  selector: 'es-event-invitations',
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent implements OnInit {

    @Input() public event : Event;

    public results : User[] = [];
    public invitations : Invitation[] = [];

    public pending  : Invitation[] = [];
    public accepted : Invitation[] = [];

    constructor(private route: ActivatedRoute, private events : EventService, private users : UserService, private api : APIService) { }

    ngOnInit()
    {
        let id : number = this.route.parent.snapshot.params['id'];

        this.events.getEvent(id, (model : Event) => {

            this.event = model;

            this.setPendingInvitations();
            this.setAcceptedInvitations();

        }, () => {

            console.error('Cannot fetch event with ID: ' + id);

        });

    }

    private setPendingInvitations() : void
    {
        this.pending = [];

        let results : Invitation[] = [];

        for(let index : number = 0; index < this.event.invitations.length; index++)
        {
            let current : Invitation = this.event.invitations[index];

            if(!current.isAccepted())
            {
                results.push(current);
            }
        }

        this.pending = results;
    }

    private setAcceptedInvitations() : void
    {
        this.accepted = [];

        let results : Invitation[] = [];

        for(let index : number = 0; index < this.event.invitations.length; index++)
        {
            let current : Invitation = this.event.invitations[index];

            if(current.isAccepted())
            {
                results.push(current);
            }
        }

        this.accepted = results;
    }

    public search(event : any) : void
    {
        let criteria : string = event.target.value.trim();

        if(criteria.length < 1)
        {
            if(criteria.length < 1)
            {
                this.results = [];
            }

            return;
        }

        this.results = [];

        this.users.search(criteria, (results : User[]) => {

            let user : User = this.api.getCurrentUser();
            let invitedUserIDs : number[] = [];

            for(let index : number = 0; index < this.event.invitations.length; index++)
            {
                invitedUserIDs.push(this.event.invitations[index].getUser().getID());
            }

            for(let index : number = 0; index < results.length; index++)
            {
                if(results[index].getID() != user.getID() && invitedUserIDs.indexOf(results[index].getID()) < 0)
                {
                    this.results.push(results[index]);
                }
            }

        }, () => {
            console.error('Cannot search for users with criteria: ' + criteria);
        });
    }

    public update() : void
    {
        this.setPendingInvitations();
        this.setAcceptedInvitations();
    }

}
