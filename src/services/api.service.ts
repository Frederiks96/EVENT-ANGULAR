import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class APIService
{
    private url: string = 'http://localhost:8080/api/';

    private tokenKey   : string = "api-auth-token";
    private tokenValue : string = null;

    constructor(private http: Http, private router : Router)
    {
        let token = sessionStorage.getItem(this.tokenKey);

        if (token != null)
        {
            this.tokenValue = token;
        }
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

        sessionStorage.setItem(this.tokenKey, this.tokenValue);
    }

}
