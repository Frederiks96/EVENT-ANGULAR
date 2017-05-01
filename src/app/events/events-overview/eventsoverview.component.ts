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
    public attending: Event[] = [];
    public pending: Event[] = [];
    public _public: Event[] = [];

    constructor(private eventService: EventService, private apiService: APIService) {
    }

    ngOnInit() {

        this.user = this.apiService.getCurrentUser();

        this.eventService.getEvents((events: Event[]) => {

            this.events = events;
            this.loadContent();

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
                       // this.invited.push(event);
                        if(invitation.isAccepted()) {
                            this.attending.push(event);
                        }
                        else {
                            this.pending.push(event)
                        }

                        toPublicList = false;
                        break;
                    }
                }
            }

            if (toPublicList) {
                if (event.isPublic) {
                    this._public.push(event);
                }
            }
        }
    }

    onStatusChange(event: Event, key: string) {

        if(key === "pending") {
            this.pending.splice(this.pending.indexOf(event),1);
            this.attending.push(event);
        }

        if(key === "public") {
            this._public.splice(this._public.indexOf(event),1);
            this.attending.push(event);
        }
    }
}

