import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}    from "@angular/router";

import { Event } from '../event/event';
import { User }  from "../../models/User";
import { UserService } from "../../services/user.service";
import {Invitation} from "../../models/Invitation";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'es-event-invitations',
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent implements OnInit {

    @Input() public event : Event;

    public results : User[] = [];
    public invitations : Invitation[] = [];

    private previousSearchCriteria : string = '';

    constructor(private route: ActivatedRoute, private events : EventService, private users : UserService) { }

    ngOnInit()
    {
        let id : number = this.route.snapshot.params['id'];

        this.events.getEvent(id, (model : Event) => {

            this.event = model;

        }, () => {

            console.error('Cannot fetch event with ID: ' + id);

        });

    }

    public search(event : any) : void
    {
        let criteria : string = event.target.value.trim();

        if(criteria.length < 1 || this.previousSearchCriteria == criteria)
        {
            if(criteria.length < 1)
            {
                this.results = [];
            }

            return;
        }

        /*
         * This is stored (and checked against) to ensure no duplicate search requests are
         * made, when the user typed fast.
         */
        this.previousSearchCriteria = criteria;

        this.users.search(criteria, (results : User[]) => {
            this.results = results;

            console.debug(results);
        }, () => {
            console.error('Cannot search for users with criteria: ' + criteria);
        });
    }

}
