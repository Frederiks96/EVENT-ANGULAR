import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from "../user/user";

@Injectable()
export class APIService
{
    private STORAGE_KEY_API_TOKEN     = 'api-token';
    private STORAGE_KEY_USER_USERNAME = "current-user";

    private url = 'http://ubuntu4.javabog.dk:3028/rest/api';
    //private url = 'http://localhost:8080/api';

    private token : string = null;
    private user  : User   = null;

    constructor(private http: Http, private router: Router)
    {
        this.resume();
    }

    public authorize(username : string, password : string, success: (response: Response) => void, failure: (error: Response) => void): void
    {
        let body = JSON.stringify({
            username: username,
            password: password
        });

        let observable = this.http.post(this.url + '/authentication', body, {

            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        observable.subscribe(
            response =>
            {
                this.setup(response, username);
                success(response);
            },
            error => failure(error)
        );
    }

    public logout() : void
    {
        this.destroy();
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

    public getCurrentUser() : User
    {
        return this.user;
    }

    private makeHeaders() : Headers
    {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
    }

    private setup(response: Response, username : string): void
    {
        this.token = response.json().token;

        localStorage.setItem(this.STORAGE_KEY_API_TOKEN, this.token);

        /*
         * Load the currently signed in user.
         */
        this.loadCurrentUser(username);
    }

    private resume() : void
    {
        let token    = localStorage.getItem(this.STORAGE_KEY_API_TOKEN);
        let username = localStorage.getItem(this.STORAGE_KEY_USER_USERNAME);

        if(token == null)
        {
            console.debug('[DEBUG] No API token available');
            return;
        }

        if(username == null)
        {
            console.error('[ERROR] Cannot resume session. Current user could not be fetched.');
            return;
        }

        this.token = token;
        this.loadCurrentUser(username);

        console.debug('[DEBUG] Resumed API token');
    }

    private loadCurrentUser(username : string) : void
    {
        let failure = () => {
            console.error('Cannot load currently signed in user!');
        };

        this.execute(this.get('/users/search/' + username), (response : Response) =>
        {
            let payload : any[] = response.json().results;

            if(payload.length < 1)
            {
                failure();
                return;
            }

            this.user = new User(
                payload[0].id,
                payload[0].username
            );

            localStorage.setItem(this.STORAGE_KEY_USER_USERNAME, username);

        }, failure);
    }

    private destroy(): void
    {
        console.debug('[DEBUG] Deleted saved API token.');

        this.user  = null;
        this.token = null;

        localStorage.removeItem(this.STORAGE_KEY_API_TOKEN);
        localStorage.removeItem(this.STORAGE_KEY_USER_USERNAME);

        this.redirect();
    }

    private redirect() : void
    {
        this.user = null;
        this.router.navigate(['/signin']);
    }

    public isAuthenticated() {
        return this.user != null;
    }
}
