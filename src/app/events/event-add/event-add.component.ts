import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {APIService} from "../../../services/api.service";

@Component({
  selector: 'es-event-add',
  templateUrl: './event-add.component.html'
})
export class EventAddComponent {


    constructor(private api: APIService){}

    private event: Event;

    isPublic = [
        'Offentlig',
        'Ikke offentlig'
    ];

    onSubmit(form: NgForm) {
        console.log(form.value);

        this.api.addEvent(this.event,() =>
            {
                console.log('Successfully created event');
            },
            () =>
            {
                console.log('Failed creation of event');
            });


    }
}
