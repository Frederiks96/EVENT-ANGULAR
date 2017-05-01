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
    public hosted: Event[] = [];
    public invited: Event[] = [];
    public _public: Event[] = [];
    public accepted: boolean[] = [];

    constructor(private eventService: EventService, private apiService: APIService) {
    }

    ngOnInit() {

        this.user = this.apiService.getCurrentUser();
        console.debug(this.user);

        this.eventService.getEvents((events: Event[]) => {

            this.events = events;
            this.loadContent();

            console.debug(this.hosted);
            console.debug(this.invited);
            console.debug(this._public);
        }, null);
    }

    public loadContent() {

        for (const event of this.events) {

            let toPublicList = true;

            for (const organizer of event.organizers) {
                if (organizer.getID() == this.user.getID()) {
                    this.hosted.push(event);
                    toPublicList = false;
                    break;
                }
            }

            for (const invitation of event.invitations) {
                if (invitation.getUser().getID() == this.user.getID()) {
                    if (this.hosted.indexOf(event) === -1) {
                        this.invited.push(event);
                    this.accepted.push(invitation.isAccepted());
                    console.log(this.accepted);
                    toPublicList = false;
                    break;
                }
            }

            if (toPublicList) {
                if (event.isPublic) {
                    this._public.push(event);
                }
                else {
                    console.log(event);
                    console.log(event.isPublic);
                }
            }
        }
    }
}
