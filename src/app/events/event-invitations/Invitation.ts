import {User} from "../../user/user";

/**
 * Created by thomas on 23/04/2017.
 */
export class Invitation {

    constructor(private id: number, private user: User, private eventID: number, private accepted: boolean) {}

    public getInvitationID(): number
    {
        return this.id;
    }

    public getEventID(): number
    {
        return this.eventID;
    }

    public isAccepted(): boolean
    {
        return this.accepted;
    }

    public getUser(): User
    {
        return this.user;
    }

}
