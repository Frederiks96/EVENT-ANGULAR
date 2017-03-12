import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {APIService} from "../../../services/api.service";


@Component({
  selector: 'es-event-add',
  templateUrl: './event-add.component.html'
})
export class EventAddComponent {


    constructor(private api: APIService){}

    event = {
        name: "",
        description: "",
        start: 0,
        end: 0,
        address: "",
        isPublic: true
    };

    isPublic = [
        'Offentlig',
        'Ikke offentlig'
    ];

    onSubmit(form: NgForm) {
        console.log(form.value);

        this.event.start = new Date(form.value.start).getTime()/1000;
        this.event.end = new Date(form.value.end).getTime()/1000;
        this.event.isPublic = form.value.isPublic == this.isPublic[0];

        console.log(this.event);


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
