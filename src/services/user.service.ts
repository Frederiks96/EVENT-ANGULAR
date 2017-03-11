import {Injectable, EventEmitter} from '@angular/core';
import {Response} from "@angular/http";
import {APIService} from "./api.service";

@Injectable()
export class UserService {

  private stateChange: EventEmitter<boolean> = new EventEmitter();
  private state = false;

  constructor(private api : APIService) { }

    signIn(user: any)
    {
        this.state = !this.state;
        this.stateChange.emit(this.state);

        this.api.authorize(user,
            () =>
            {
                console.log('You are now logged in');
            },
            () =>
            {
                console.log('Invalid credentials');
            }
        )
    }

  isAuthenticated() {
    return this.state;
  }

  public events: EventEmitter<boolean>  = this.stateChange;

}
