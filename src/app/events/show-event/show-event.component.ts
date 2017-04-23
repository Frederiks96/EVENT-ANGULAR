import {Component, OnInit, OnDestroy} from '@angular/core';
import { Event } from '../event/event';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {EventService} from '../../services/event.service';
import {Subscription} from "rxjs";
import {User} from "../../models/User";
import {APIService} from "../../services/api.service";


@Component({
  selector: 'es-show-event',
  templateUrl: 'show-event.component.html',
  styleUrls: ['show-event.component.css']
})
export class ShowEventComponent implements OnInit, OnDestroy {

    private event: Event = null;
    private id: number;
    private subscription: Subscription;

    public isCurrentUserOrganizer : boolean = false;

    constructor(private route: ActivatedRoute, private eventService: EventService, private api : APIService, private router : Router) {
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

    public deleteEvent()
    {
        this.eventService.deleteEvent(this.event.id, () => {
            this.router.navigate(['/events']);
        }, null);
    }

    private updateState() : void
    {
        let user : User = this.api.getCurrentUser();

        /*
         * Check if the currently signed in user is an organizer of the event.
         */
        this.isCurrentUserOrganizer = true; // TODO: Make this automatic


    }

}
