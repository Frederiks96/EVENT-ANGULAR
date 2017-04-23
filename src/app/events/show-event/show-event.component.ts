import {Component, OnInit, OnDestroy} from '@angular/core';
import { Event } from '../event/event';
import {ActivatedRoute, Params} from '@angular/router';

import {EventService} from '../../services/event.service';
import {Subscription} from "rxjs";


@Component({
  selector: 'es-show-event',
  templateUrl: 'show-event.component.html',
  styleUrls: ['show-event.component.css']
})
export class ShowEventComponent implements OnInit, OnDestroy {

    private event: Event;
    private id: number;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private eventService: EventService) {
    }

    ngOnInit() {
/*        this.id = this.route.snapshot.params['id'];
        console.log(this.id);

        this.eventService.getEvent(this.id, (event: Event) => {
            this.event = event;
            console.log(event)
        }, () => {
            console.log("err")
        });*/


        this.route.params.subscribe(
            (params: Params) => {
                this.id = params['id'];
                console.log(this.id);
                this.eventService.getEvent(this.id, (event: Event) => {
                    this.event = event;
                    console.log(this.event);
                }, null);
            }
        );
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }

}
