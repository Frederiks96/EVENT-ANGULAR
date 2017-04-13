import { Response } from './response';

export class Invite {

    constructor(private id: number, private eventId: number, private response: Response) {

    }

    public getId() : number {
        return this.id;
    }

    public getEventId() : number {
        return this.eventId;
    }

    public getResponse() : string {
        let description: string;

        if (this.response == -1) {
            description = 'Not going';
        } else if (this.response == 0) {
            description = 'Not answered';
        } else {
            description = 'Going';
        }
        return description;
    }

    public setResponse(response: Response) {
        this.response = response;
    }

}
