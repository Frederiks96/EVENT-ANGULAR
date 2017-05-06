import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { APIService } from './api.service';
import { User } from '../user/user';

@Injectable()
export class UserService {

    constructor(private api: APIService) { }


    public search(criteria: string, callback: (results: User[]) => void, error: () => void): void
    {
        this.api.execute(this.api.get('/users/search/' + criteria), (response: Response) => {

            const results: User[] = [];
            const payload: any[]  = response.json().results;

            for (let index = 0; index < payload.length; index++)
            {
                results.push(new User(
                    payload[index].id,
                    payload[index].username
                ));
            }

            callback(results);

        }, error);
    }

    update(user: User, callback: (success: boolean) => void) {
        this.api.execute(this.api.put('/users/' + user.getID(), JSON.stringify(user)), (response: Response) =>
        {
            if (response.status == 204) {
                this.api.setCurrentUser(user);
                callback(true);
                return;
            }

            callback(false);

        });
    }

    getCurrentUser() : User {
        return this.api.getCurrentUser();
    }

    isAuthenticated() : boolean {
        return this.api.isAuthenticated();
    }

    logOut() {
        this.api.logout();
    }

    public authorize(username: string, password: string, success: (response: Response) => void, failure: (error: Response) => void): void{
        this.api.authorize(username, password, success, failure);
    }


}
