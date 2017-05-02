import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable()
export class APIService
{
    private STORAGE_KEY_API_TOKEN     = 'api-token';
    private STORAGE_KEY_USER_OBJECT = 'current-user';

    //private url = 'http://ubuntu4.javabog.dk:3028/rest/api';
    private url = 'http://localhost:8080/api';

    private token: string = null;
    private user: User   = null;

    constructor(private http: Http, private router: Router)
    {
        this.resume();
    }

    public authorize(username: string, password: string, success: (response: Response) => void, failure: (error: Response) => void): void
    {
        const body = JSON.stringify({
            username: username,
            password: password
        });

        const observable = this.http.post(this.url + '/authentication', body, {

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

    public logout(): void
    {
        this.destroy();
    }

    public get(url: string): Observable<Response>
    {
        return this.http.get(this.url + url, {
            headers: this.makeHeaders()

        });
    }

    public post(url: string, body: string): Observable<Response>
    {
        return this.http.post(this.url + url, body, {
            headers: this.makeHeaders()
        });
    }

    public put(url: string, body: string): Observable<Response>
    {
        return this.http.put(this.url + url, body, {
            headers: this.makeHeaders()
        });
    }

    public delete(url: string): Observable<Response>
    {
        return this.http.delete(this.url + url, {
            headers: this.makeHeaders()
        });
    }

    public execute(observable: Observable<Response>, success: (response: Response) => void, failure?: (error: Response | any) => void, done?: () => void): void
    {
        const validator = (status: number) =>
        {
            if (status == 401)
            {
                this.destroy();
            }
        };

        const wrappedSuccess = (response: Response) =>
        {
            success(response);

            if (done != null)
            {
                done();
            }
        };

        const wrappedFailure = (response: Response | any) =>
        {
            if (response instanceof Response)
            {
                validator(response.status);
            }

            if (failure != null)
            {
                failure(response);
            }

            if (done != null)
            {
                done();
            }
        };

        observable.subscribe(success => wrappedSuccess(success), error => wrappedFailure(error));
    }

    public getCurrentUser(): User
    {
        return this.user;
    }

    public setCurrentUser(newUser: User)
    {
        this.user = newUser;
        localStorage.setItem(this.STORAGE_KEY_USER_OBJECT, JSON.stringify(this.user));
    }

    private makeHeaders(): Headers
    {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
    }

    private setup(response: Response): void
    {
        const json: any = response.json();
        this.token = json.token;

        this.user = new User(json.user.id, json.user.username, json.user.firstname, json.user.lastname, json.user.email);

        localStorage.setItem(this.STORAGE_KEY_API_TOKEN, this.token);
        localStorage.setItem(this.STORAGE_KEY_USER_OBJECT, JSON.stringify(this.user));
    }

    private resume(): void
    {
        const token = localStorage.getItem(this.STORAGE_KEY_API_TOKEN);
        const user  = localStorage.getItem(this.STORAGE_KEY_USER_OBJECT);

        if (token == null)
        {
            console.debug('[DEBUG] No API token available');
            return;
        }

        if (user == null)
        {
            console.error('[ERROR] Cannot resume session. Current user could not be fetched.');
            return;
        }

        const json = JSON.parse(user);

        this.token = token;
        this.user = new User(json.id, json.username, json.firstname, json.lastname, json.email);

        console.debug('[DEBUG] Resumed API token');
    }

    private destroy(): void
    {
        console.debug('[DEBUG] Deleted saved API token.');

        this.user  = null;
        this.token = null;

        localStorage.removeItem(this.STORAGE_KEY_API_TOKEN);
        localStorage.removeItem(this.STORAGE_KEY_USER_OBJECT);

        this.redirect();
    }

    private redirect(): void
    {
        this.user = null;
        this.router.navigate(['/signin']);
    }

    public isAuthenticated() {
        return this.user != null;
    }
}
