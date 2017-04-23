import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";

import { APIService } from './api.service';
import { Event }      from '../events/event/event';
import {ApiEvent} from "../events/event/api-event";

@Injectable()
export class EventService {

    private events : Map<number, Event> = new Map<number, Event>();

    constructor(private api: APIService) {}

    public getEvents(callback: (events: Event[]) => void, failure: () => void) {

        let observable : Observable<Response> = this.api.get("/events");

        let map = (response : Response) => {

            let events  : Event[] = [];
            let payload : any     = JSON.parse(response.text()).results;

            for(let index : number = 0; index < payload.length; index++) {
                events[index] = new Event(
                    payload[index].id,
                    payload[index].details.title,
                    payload[index].details.description,
                    payload[index].details.address,
                    payload[index].details.imageURL,
                    payload[index].details.start,
                    payload[index].details.end,

                //    new Date(payload[index].details.start),
                //    new Date(payload[index].details.end),

                    payload[index].details.isPublic
                );

                this.events.set(events[index].getId(), events[index]);
            }


            callback(events);
        };

        this.api.execute(observable, map, failure);
    }

    public getEvent(id: number,  callback: (event: Event) => void, failure: () => void) : void {

        if(this.events.size < 1) {

            failure();
            return;
        }

        console.log(this.events.get(id));
        callback(this.events.get(id));

    }

    public createEvent(model : Event, success : (model : Event) => void, failure : () => void)
    {
        let body : string = JSON.stringify(model);

        this.api.execute(this.api.post("/events", body), (response : Response) => {

            let payload : any = response.json();

            model.setID(payload.id);

         //   let event = this.parseApiToEvent(model);

            this.events.set(payload.id, model);

            success(model);

        }, failure);
    }

    public updateEvent (model : Event, success : () => void, failure : () => void)
    {
        let body : string = JSON.stringify(model);

        this.api.execute(this.api.put("/events/" + model.getId(), body), () => {

            this.events.set(model.getId(), model);
            success();

        }, failure);

    }

    public deleteEvent(id : number, success : () => void, failure : () => void) : void {

        let observable : Observable<Response> = this.api.delete("/events/" + id);

        this.api.execute(observable, () => {

            if(this.events.delete(id)) {
                success();

                return;
            }

            failure();

        }, failure);
    }

/*
    public parseEventToApi(event : Event) : ApiEvent {

        return new ApiEvent(
            event.getId(),
            event.title,
            event.description,
            event.address,
            event.imageURL,
            event.start.getMilliseconds(),
            event.end.getMilliseconds(),
            event.isPublic);
    }

    public parseApiToEvent(event : ApiEvent) : Event {

        return new Event(
            event.getId(),
            event.title,
            event.description,
            event.address,
            event.imageURL,
            new Date(event.start),
            new Date (event.end),
            event.isPublic);
    }*/


}
