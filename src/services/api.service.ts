import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class APIService
{
    private url: string = 'http://localhost:8080/api/';

    private tokenKey    : string = "api-auth-token";
    private tokenValue  : string = null;
    private tokenExpire : number = 3 * 60; // 3 mins

    constructor(private http: Http, private router : Router)
    {
        this.resume();
    }

    public authorize(user: any, success: (response: Response) => void, failure: (error: Response) => void): void
    {
        let body = JSON.stringify(user);
        let observable = this.http.post(this.url + 'users/authorize', body, {

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

    public getEvents()
    {
        if(!this.validate())
        {
            return;
        }

        let observable = this.http.get(this.url + "events", {

            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Auth-Token': this.tokenValue
            })

        });

        observable.subscribe(response => console.log(JSON.parse(response.text())), error => console.error(error));
    }

    private validate() : boolean
    {
        if(this.tokenValue == null)
        {
            this.router.navigate(['/signIn']);

            return false;
        }

        return true;
    }

    private setup(response: Response): void
    {
        this.tokenValue = JSON.parse(response.text()).token;

        let auth = {
            token:  this.tokenValue,
            expire: Date.now() + this.tokenExpire * 1000
        };

        localStorage.setItem(this.tokenKey, JSON.stringify(auth));
    }

    private resume() : void
    {
        let value = localStorage.getItem(this.tokenKey);

        if(value == null)
        {
            console.debug("[DEBUG] No API session available");
            return;
        }

        let auth = JSON.parse(value);

        if(auth.expire < Date.now())
        {
            localStorage.removeItem(this.tokenKey);

            console.debug("[DEBUG] API session has expired");
            return;
        }

        this.tokenValue = auth.token;

        console.debug("[DEBUG] Resumed API session. Token expires: " + new Date(auth.expire).toLocaleString());
    }

    private refresh() : void
    {

    }

    private destroy() : void
    {

    }

}
