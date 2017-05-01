import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';

import {APIService} from './api.service';
import {Invitation} from '../events/event-invitations/Invitation';
import {User}       from '../user/user';

@Injectable()
export class InvitationService {

    constructor(private api: APIService) { }

    public create(eventID: number, user: User, callback: (invitation: Invitation) => void, error: () => void): void
    {
        const body = JSON.stringify({
            'user_id': user.getID()
        });

        this.api.execute(this.api.post('/events/' + eventID + '/invitations', body), (response: Response) => {

            const payload: number = response.json().id;
            const model: Invitation = new Invitation(payload, user, eventID, false);

            callback(model);

        }, error);
    }

    public remove(eventID: number, invitationID: number, callback: () => void, error: () => void): void
    {
        this.api.execute(this.api.delete('/events/' + eventID + '/invitations/' + invitationID), callback, error);
    }

    public accept(eventID: number, invitationID: number, callback: () => void, error: () => void): void
    {
        const body = JSON.stringify({
            accepted: true
        });

        this.doUpdate(body, eventID, invitationID, callback, error);
    }

    public decline(eventID: number, invitationID: number, callback: () => void, error: () => void): void
    {
        const body = JSON.stringify({
            accepted: false
        });

        this.doUpdate(body, eventID, invitationID, callback, error);
    }

    private doUpdate(body: string, eventID: number, invitationID: number, callback: () => void, error: () => void): void
    {
        this.api.execute(this.api.put('/events/' + eventID + '/invitations/' + invitationID, body), callback, error);
    }

    public fetchInvitations(callback: (invitations: Invitation[], eventTitles: string[]) => void)
    {
        this.api.execute(this.api.get('/events'), (response: Response) =>
        {
            const payload = response.json().results;
            const invites: Invitation[] = [];
            const titles: string[] = [];
            const user = this.api.getCurrentUser();


            for (let i = 0; i < payload.length; i++)
            {
                let isOrganizer = false;
                const invitations = payload[i].invitations;
                for (let j = 0; j < payload[i].organizers.length; j++)
                {
                    if (payload[i].organizers[j].user.id === user.getID())
                    {
                        isOrganizer = true;
                    }
                }

                for (let j = 0; j < invitations.length; j++)
                {
                    const invitation = invitations[j];

                    if (invitation.user.username === user.getUsername() && !isOrganizer)
                    {
                        invites.push(new Invitation(invitation.id, new User(invitation.user.id, invitation.user.username), invitation.event, invitation.accepted));
                        titles.push(payload[i].details.title);
                    }
                }
            }
            callback(invites, titles);
        });
    }

    public fetchInvitation(eventID: number, callback: (invitation: Invitation) => void)
    {
        this.api.execute(this.api.get('/events/' + eventID), (response) => {
            const payload = response.json().invitations;
            const user = this.api.getCurrentUser();
            for (let i = 0; i < payload.length; i++)
            {
                if (payload[i].user.id === user.getID())
                {
                    callback(new Invitation(payload[i].id, user, payload[i].event, payload[i].accepted));
                    return;
                }
            }
            callback(null);
        });
    }

}
