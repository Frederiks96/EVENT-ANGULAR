import {Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import { EventService } from '../../services/event.service';
import {APIService} from "../../services/api.service";
import {User} from "../../user/user";

@Component({
  selector: 'es-events',
  templateUrl: 'eventsoverview.component.html',
  styleUrls: ['eventsoverview.component.css']
})
export class EventsOverviewComponent implements OnInit {

    public user: User;
    public events: Event[] = [];
    public hostedEvents: Event[] = [];
    public invitedEvents: Event[] = [];
    public publicEvents: Event[] = [];

    constructor(private eventService: EventService, private apiService: APIService) {
    }

    ngOnInit() {

        this.user = this.apiService.getCurrentUser();
        console.debug(this.user);

        this.eventService.getEvents((events: Event[]) => {

            this.events = events;
            this.loadContent();

            console.debug(this.hostedEvents);
            console.debug(this.invitedEvents);
            console.debug(this.publicEvents);
        }, null);



    }

    public loadContent() {


        for (const event of this.events) {

            let toPublicList = true;

            for (const organizer of event.organizers) {
                if(organizer.getID() === this.user.getID()) {
                    this.hostedEvents.push(event);
                    toPublicList = false;
                    break;
                }
            }

            for (const invitation of event.invitations) {
                    if (invitation.getUser().getID() === this.user.getID()) {
                        if (this.hostedEvents.indexOf(event) === -1) {
                            this.invitedEvents.push(event);
                            toPublicList = false;
                        }
                        break;
                    }
            }

            if (toPublicList) {
                if (event.isPublic) {
                    this.publicEvents.push(event);
                }
                else {
                    console.log(event);
                    console.log(event.isPublic);
                }
            }
        }

    }
}
