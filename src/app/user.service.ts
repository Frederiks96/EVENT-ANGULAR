import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class UserService {

  private stateChange: EventEmitter<boolean> = new EventEmitter();
  private state = false;

  constructor() { }

  signIn(username: string, password: string) {
    this.state = !this.state;
    this.stateChange.emit(this.state);
  }

  isAuthenticated() {
    return this.state;
  }

  public events: EventEmitter<boolean>  = this.stateChange;

}
