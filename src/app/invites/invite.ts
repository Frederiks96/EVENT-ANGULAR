
export class Invite {

    constructor(private id: number, private eventId: number, private going: boolean) {

    }

    public getId() : number {
        return this.id;
    }

    public getEventId() : number {
        return this.eventId;
    }

    public isGoing() : boolean {
        return this.going;
    }

    public setGoing(going: boolean) {
        this.going = going;
    }

}
