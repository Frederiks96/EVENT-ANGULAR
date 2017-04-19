import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import { Event } from '../events/event/event';
import {window} from "rxjs/operator/window";

@Injectable()
export class EventService {

    events: Event[] = [];

    constructor(private apiService: APIService) {
        console.log('event service');
        this.apiService.fetchEvents((events: Event[]) => {
            this.events = events;
        }, null);
        (<any> window).models = {events: this.events};
    }

    public getEvents(callback: (events: Event[]) => void, failure: () => void) {
        callback(this.events);
    }

    public getEvent(id: number,  callback: (event: Event) => void, failure: () => void) {
        for (let i = 0; i < this.events.length; i++) {
            console.log(this.events.length);
            console.log('id:' + id);
            if (this.events[i].getId() == id) {
                console.log('return');
                callback(this.events[i]);
                console.log(this.events[i]);
            }
        }

        // this.apiService.fetchEvent(id, callback, failure);
    }

}
