import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { APIService } from "./api.service";
import { User } from "../user/user";

@Injectable()
export class UserService {

  private state = false;

  constructor(private api : APIService) { }

  /*
  isAuthenticated() {
    return this.state;
  }

  signOut() {
      this.state = false;
  }

    */


    public search(criteria : string, callback : (results : User[]) => void, error : () => void) : void
    {
        this.api.execute(this.api.get('/users/search/' + criteria), (response : Response) => {

            let results : User[] = [];
            let payload : any[]  = response.json().results;

            for(let index : number = 0; index < payload.length; index++)
            {
                results.push(new User(
                    payload[index].id,
                    payload[index].username
                ));
            }

            callback(results);

        }, error);
    }


}
