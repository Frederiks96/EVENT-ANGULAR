import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';

import {APIService} from "./api.service";
import {Invitation} from "../models/Invitation";
import {User}       from "../models/User";

@Injectable()
export class InvitationService {

    constructor(private api : APIService) { }

    public create(eventID : number, user : User, callback : (invitation : Invitation) => void, error : () => void) : void
    {
        let body = JSON.stringify({
            'user_id': user.getID()
        });

        this.api.execute(this.api.post('/events/' + eventID + 'invitations', body), (response : Response) => {

            let payload : number = response.json().id;
            let model   : Invitation = new Invitation(payload, user, eventID);

            callback(model);

        }, error);
    }

    public remove(id : number, callback : () => void, error : () => void) : void
    {

    }

}
