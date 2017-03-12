import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Event} from "../app/events/event/event";

@Injectable()
export class APIService
{
    private TOKEN_STORAGE_KEY = "api-token";

    private url   : string = 'http://localhost:8080/api/';
    private token : string = null;

    constructor(private http: Http, private router : Router)
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
            error =>
            {
                failure(error);
            }
        );
    }

    public getEvents(callback : (events : Event[]) => void, failure : () => void) : void
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

                events[index] = new Event(payload.name, payload.description, new Date(payload.start), new Date(payload.end), payload.address, payload.isPublic);
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
        let status : number = 0;

        let response = function(response : Response) : void
        {
            status = response.status;

            success(response);
        };

        /*
         * Check if the failure callback is undefined and created
         * an empty function instead.
         */
        if(failure == null)
        {
            failure = () => {};
        }

        observable.subscribe(success => response(success), error => failure(error), () =>
        {
            /*
             * Check if the request returned 403 (Forbidden) and remove any saved API token.
             */
            if(status == 403)
            {
                console.debug('[DEBUG] API call returned 403 (Forbidden). Current API token is invalid.');

                this.destroy();
            }

            if(done == null)
            {
                return;
            }

            done();
        });
    }

    private validate() : boolean
    {
        if(this.token == null)
        {
            this.redirect();
            return false;
        }

        return true;
    }

    private setup(response: Response): void
    {
        this.token = JSON.parse(response.text()).token;

        localStorage.setItem(this.TOKEN_STORAGE_KEY, this.token);
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

        console.debug('[DEBUG] Resumed API token');
    }

    private destroy() : void
    {
        console.debug('[DEBUG] Deleted saved API token.');

        localStorage.removeItem(this.TOKEN_STORAGE_KEY);

        this.redirect();
    }

    private redirect() : void
    {
        this.router.navigate(['/signin']);
    }
}
