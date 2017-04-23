export class ApiEvent {

    constructor(private id: number = 0,
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
