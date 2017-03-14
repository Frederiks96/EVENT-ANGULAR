export class Event {

    constructor(private id: number,
                public name: string,
                public description: string,
                public start: Date,
                public end: Date,
                public address: string,
                public isPublic: boolean) {
    }

    public getId() : number {
        return this.id;
    }

}
