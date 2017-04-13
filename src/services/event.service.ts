import { Injectable } from '@angular/core';
import {APIService} from "./api.service";
import { Event } from "../app/events/event/event";

@Injectable()
export class EventService {

    events: Event[];

    constructor(private apiService: APIService) {
        this.apiService.fetchEvents((events: Event[]) => {
            this.events = events;
        }, null);
    }


    public getEvent(id: number,  callback: (event: Event)=>void, failure: ()=>void)
    {
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].getId() == id) {
                callback(this.events[i]);
            }
        }

        //this.apiService.fetchEvent(id, callback, failure);
    }

}
