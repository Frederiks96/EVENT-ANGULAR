/**
 * Created by thomas on 23/04/2017.
 */

export class User {

    constructor(private id : number, private username : string, private firstname?: string, private lastname?: string, private email?: string)
    {
        if(this.firstname == null)
        {
            this.firstname = '';
        }

        if(this.lastname == null)
        {
            this.lastname = '';
        }

        if(this.email == null)
        {
            this.email = '';
        }
    }

    public getID() : number
    {
        return this.id;
    }

    public getUsername() : string
    {
        return this.username;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public getEmail(): string {
        return this.email;
    }
}
