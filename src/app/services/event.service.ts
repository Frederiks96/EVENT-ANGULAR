import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";

import { APIService } from './api.service';
import { Event }      from '../events/event/event';

@Injectable()
export class EventService {

    private events : Event[] = [];

    constructor(private api: APIService) {}

    public getEvents(callback: (events: Event[]) => void, failure: () => void)
    {
        if(this.events.length > 0)
        {
            this.events = [];
        }

        let observable : Observable<Response> = this.api.get("/events");

        let map = (response : Response) =>
        {
            let payload : any = response.json().results;

            for(let index : number = 0; index < payload.length; index++)
            {
                let current : any = payload[index];

                this.events.push(new Event(
                    current.id,
                    current.details.title,
                    current.details.description,
                    current.details.address,
                    current.details.imageURL,

                    new Date(current.details.start),
                    new Date(current.details.end),

                    current.details.isPublic
                ));
            }

            callback(this.events);
        };

        this.api.execute(observable, map, failure);
    }

    public getEvent(id: number,  callback: (event: Event) => void, failure: () => void) : void
    {
        let model : Event = this.fetch(id);

        if(model == null)
        {
            failure();
            return;
        }

        callback(model);
    }

    public createEvent(model : Event, success : (model : Event) => void, failure : () => void)
    {
        let body : string = JSON.stringify(model);

        this.api.execute(this.api.post("/events", body), (response : Response) => {

            let payload : any = response.json();

            model.id = payload.id;

            this.events.push(model);

            success(model);

        }, failure);
    }

    public updateEvent (model : Event, success : () => void, failure : () => void)
    {
        let body     : string = JSON.stringify(model);
        let existing : Event  = this.fetch(model.id);

        if(existing == null)
        {
            console.error("Cannot update non-existing events!");
            return;
        }

        this.api.execute(this.api.put("/events/" + model.getId(), body), () =>
        {
            this.events[this.events.indexOf(existing)] = model;
            success();
        }, failure);
    }

    public deleteEvent(id : number, success : () => void, failure : () => void) : void {

        let observable : Observable<Response> = this.api.delete("/events/" + id);

        this.api.execute(observable, () => {

            let existing = this.fetch(id);

            if(existing == null)
            {
                failure();
                return;
            }

            this.events.splice(this.events.indexOf(existing), 1);
            success();

        }, failure);
    }

    private fetch(key : number) : Event
    {
        for(let index : number = 0; index < this.events.length; index++)
        {
            if(this.events[index].id == key)
            {
                return this.events[index];
            }
        }

        return null;
    }
}
