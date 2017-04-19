import { Component, OnInit } from '@angular/core';
import { Invite } from "./invite";
import { Response } from './response';

@Component({
    selector: 'es-invites',
    templateUrl: './invites.component.html',
    styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

    private invites: Invite[];

    constructor() {
        this.invites = [
            new Invite(0, 12, Response.Going),
            new Invite(1, 10, Response.NotAnswered),
            new Invite(2, 15, Response.Going)
        ]
    }

    ngOnInit() {
    }

}
