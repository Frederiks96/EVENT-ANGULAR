import {Invitation} from "../event-invitations/Invitation";
import {User} from "../../user/user";
export class Event {

    public organizers  : User[] = [];
    public invitations : Invitation[] = [];

    constructor(public id: number,
                public title: string,
                public description: string,
                public address: string,
                public imageURL: string,
                public start: number,
                public end: number,
                public isPublic: boolean) {
    }

    public setID(id : number) : void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

}
