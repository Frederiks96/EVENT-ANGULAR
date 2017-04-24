import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';

import {APIService} from "./api.service";
import {Invitation} from "../models/Invitation";
import {User}       from "../models/User";
import {Invite} from "../invites/invite";

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
            let model   : Invitation = new Invitation(payload, user, eventID);

            callback(model);

        }, error);
    }

    public remove(id : number, callback : () => void, error : () => void) : void
    {

    }

    public fetchInvitations(callback: (invitations: Invite[], eventTitles: string[]) => void) {
        this.api.execute(this.api.get('/events'), (response: Response) => {

            let payload = response.json().results;
            let invites: Invite[] = [];
            let titles: string[] =[];

            for (let i: number = 0; i < payload.length; i++)
            {
                let invitations = payload[i].invitations;

                for (let j: number = 0; j < invitations.length; j++)
                {
                    let invitation = invitations[j];

                    if(invitation.user.username == this.api.getCurrentUser().getUsername())
                    {
                        invites.push(new Invite(invitation.id, invitation.event, invitation.accepted));
                        titles.push(payload[i].details.title);
                    }
                }
            }

            callback(invites, titles);
        })
    }

}
