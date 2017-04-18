import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { Event } from "../app/events/event/event";

@Injectable()
export class APIService
{
    private TOKEN_STORAGE_KEY = "api-token";

    //private url   : string = 'http://ubuntu4.javabog.dk:3028/rest/api/';
    private url : string = 'http://localhost:8080/api/';
    private token : string = null;

    private isSignedIn = false;

    private events: Event[] = [];

    constructor(private http: Http, private router: Router)
    {
        this.resume();
    }

    public authorize(user: any, success: (response: Response) => void, failure: (error: Response) => void): void
    {
        let body = JSON.stringify(user);
        let observable = this.http.post(this.url + 'users/authenticate', body, {

            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        observable.subscribe(
            response =>
            {
                this.setup(response);
                success(response);
            },
            error => failure(error)
        );
    }

    public fetchEvent(id: number, callback: (event: Event) => void, failure: () => void)
    {
        if(!this.validate())
        {
            return;
        }

        let observable = this.http.get(this.url + "events/" + id, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        });

        let map = function (response: Response)
        {
            let event: Event;

            let payload: any = JSON.parse(response.text());
            event = new Event(payload.id, payload.name, payload.description, new Date(payload.start), new Date(payload.end), payload.address, payload.isPublic);
            callback(event);
        };

        this.execute(observable, map, failure, null);
    }

    public fetchEvents(callback : (events : Event[]) => void, failure : () => void)
    {
        if(!this.validate())
        {
            return;
        }

        let observable = this.http.get(this.url + "events", {

            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })

        });

        let map = function(response : Response) : void
        {
            let events : Event[] = [];
            let parsed : any = JSON.parse(response.text());

            for(let index : number = 0; index < parsed.count; index++)
            {
                let payload = parsed.data[index];

                events.push(new Event(payload.id, payload.name, payload.description, new Date(payload.start), new Date(payload.end), payload.address, payload.isPublic));
            }

            callback(events);
        };

        this.execute(observable, map, failure, null);
    }


    public addEvent(event: any,  success: (response: Response) => void, failure: (error: Response) => void): void {

        if(!this.validate())
        {
            return;
        }

        let body = JSON.stringify(event);
        let observable = this.http.post(this.url + "events", body, {

            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })

        });

        observable.subscribe(
            response =>
            {
                success(response);
            },
            error =>
            {
                failure(error);
            }
        );
    }

    private execute(observable : Observable<Response>, success : (response : Response) => void, failure : (error : Response | any) => void, done? : () => void) : void
    {
        let validator = (status : number) =>
        {
            if(status == 401 || status == 403)
            {
                this.destroy();
            }
        };

        let wrappedSuccess = (response : Response) =>
        {
            validator(response.status);

            success(response);

            if(done != null)
            {
                done();
            }
        };

        let wrappedFailure = (response : Response | any) =>
        {
            if(response instanceof Response)
            {
                validator(response.status);
            }

            if(failure != null)
            {
                failure(response);
            }

            if(done != null)
            {
                done();
            }
        };

        observable.subscribe(success => wrappedSuccess(success), error => wrappedFailure(error));
    }

    private validate() : boolean
    {
        if(this.token == null)
        {
            this.isSignedIn = false;

            this.destroy();
        }

        return this.isSignedIn;
    }

    private setup(response: Response): void
    {
        this.token = JSON.parse(response.text()).token;

        localStorage.setItem(this.TOKEN_STORAGE_KEY, this.token);

        this.isSignedIn = true;
    }

    private resume() : void
    {
        let value = localStorage.getItem(this.TOKEN_STORAGE_KEY);

        if(value == null)
        {
            console.debug('[DEBUG] No API token available');
            return;
        }

        this.token = value;

        this.isSignedIn = true;

        console.debug('[DEBUG] Resumed API token');
    }

    private destroy() : void
    {
        console.debug('[DEBUG] Deleted saved API token.');

        this.token = null;
        localStorage.removeItem(this.TOKEN_STORAGE_KEY);

        this.redirect();
    }

    private redirect() : void
    {
        this.isSignedIn = false;
        this.router.navigate(['/signin']);
    }

    public isAuthenticated() {
        return this.isSignedIn;
    }
}
