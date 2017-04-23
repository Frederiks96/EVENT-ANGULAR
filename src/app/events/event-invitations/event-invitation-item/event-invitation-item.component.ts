import {Component, Input, OnInit} from '@angular/core';
import {Invitation} from "../../../models/Invitation";

@Component({
  selector: 'es-event-invitation-item',
  templateUrl: './event-invitation-item.component.html',
  styleUrls: ['./event-invitation-item.component.css']
})
export class EventInvitationItemComponent implements OnInit {

    @Input() public invitation : Invitation;

    constructor() { }

    ngOnInit() {
    }

}
