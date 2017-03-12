import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'es-event-add',
  templateUrl: './event-add.component.html'
})
export class EventAddComponent {

    event = {
        eventName: '',
        placering: '',
        start: '',
        slut: '',
        isPublic: 'Offentlig'
    };

    isPublic = [
        'Offentlig',
        'Ikke offentlig'
    ];

    onSubmit(form: NgForm) {
        console.log(form.value);
    }
}
