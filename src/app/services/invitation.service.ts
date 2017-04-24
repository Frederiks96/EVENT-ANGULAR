import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';

import {APIService} from "./api.service";
import {Invitation} from "../events/event-invitations/Invitation";
import {User}       from "../user/user";

@Injectable()
export class InvitationService {

    constructor(private api : APIService) { }

    public create(eventID : number, user : User, callback : (invitation : Invitation) => void, error : () => void) : void
    {
        let body = JSON.stringify({
            'user_id': user.getID()
        });

        this.api.execute(this.api.post('/events/' + eventID + '/invitations', body), (response : Response) => {

            let payload : number = response.json().id;
            let model   : Invitation = new Invitation(payload, user, eventID, false);

            callback(model);

        }, error);
    }

    public remove(eventID : number, invitationID : number, callback : () => void, error : () => void) : void
    {
        this.api.execute(this.api.delete('/events/' + eventID + '/invitations/' + invitationID), callback, error);
    }

    public accept(eventID : number, invitationID : number, callback : () => void, error : () => void) : void
    {
        let body = JSON.stringify({
            accepted: true
        });

        this.doUpdate(body, eventID, invitationID, callback, error);
    }

    public decline(eventID : number, invitationID : number, callback : () => void, error : () => void) : void
    {
        let body = JSON.stringify({
            accepted: false
        });

        this.doUpdate(body, eventID, invitationID, callback, error);
    }

    private doUpdate(body : string, eventID : number, invitationID : number, callback : () => void, error : () => void) : void
    {
        this.api.execute(this.api.put('/events/' + eventID + '/invitations/' + invitationID, body), callback, error);
    }

}
