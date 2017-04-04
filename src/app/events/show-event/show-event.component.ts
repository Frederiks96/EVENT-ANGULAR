import {Component, OnInit, OnDestroy} from '@angular/core';
import { Event } from '../event/event';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {EventService} from "../../../services/event.service";


@Component({
  selector: 'es-show-event',
  templateUrl: 'show-event.component.html',
  styleUrls: ['show-event.component.css']
})
export class ShowEventComponent implements OnInit, OnDestroy {

    event: Event;
    private id: number;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute, private eventService: EventService) {

    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: any) => { this.id = params['id'];}
        )

        this.eventService.getEvent(this.id, (event: Event) => {this.event = event;}, null);
        console.log(this.event);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

}
