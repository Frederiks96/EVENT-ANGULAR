/**
 * Created by thomas on 23/04/2017.
 */

export class User {

    constructor(private id : number, private username : string) {}

    public getID() : number
    {
        return this.id;
    }

    public getUsername() : string
    {
        return this.username;
    }

}
