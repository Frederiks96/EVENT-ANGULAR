import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from '../events/event/event';

@Injectable()
export class APIService
{
    private TOKEN_STORAGE_KEY = 'api-token';

    //private url = 'http://ubuntu4.javabog.dk:3028/rest/api/';
     private url = 'http://localhost:8080/api';
    private token: string = null;

    private isSignedIn = false;

    constructor(private http: Http, private router: Router)
    {
        this.resume();
    }

    public authorize(user: any, success: (response: Response) => void, failure: (error: Response) => void): void
    {
        let body = JSON.stringify(user);
        let observable = this.http.post(this.url + '/authentication', body, {

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

    public get(url : string) : Observable<Response>
    {
        return this.http.get(this.url+url, {
            headers: this.makeHeaders()

        });
    }

    public post(url : string, body : string) : Observable<Response>
    {
        return this.http.post(this.url+url, body, {
            headers: this.makeHeaders()
        });
    }

    public put(url : string, body : string) : Observable<Response>
    {
        return this.http.put(this.url+url, body, {
            headers: this.makeHeaders()
        });
    }

    public delete(url : string) : Observable<Response>
    {
        return this.http.delete(this.url+url, {
            headers: this.makeHeaders()
        });
    }

    public execute(observable : Observable<Response>, success : (response : Response) => void, failure? : (error : Response | any) => void, done? : () => void) : void
    {
        let validator = (status : number) =>
        {
            if(status == 401)
            {
                this.destroy();
            }
        };

        let wrappedSuccess = (response : Response) =>
        {
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

    private makeHeaders() : Headers
    {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
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

    private destroy(): void
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
