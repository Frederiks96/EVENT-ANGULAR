export class Event {

    constructor(public id: number,
                public title: string,
                public description: string,
                public address: string,
                public imageURL: string,
                public start: Date,
                public end: Date,
                public isPublic: boolean) {
    }

    public setID(id : number) : void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

}
