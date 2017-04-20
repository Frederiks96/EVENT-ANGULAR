import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {EventService} from "../../services/event.service";
import {Event} from "../event/event";


@Component({
  selector: 'es-event-add',
  templateUrl: 'event-edit.component.html',
    styleUrls: ['event-edit.component.css']

})
export class EventEditComponent implements OnInit {

    id: number;
    editMode: boolean = false;
    eventForm: FormGroup;

    isPublic = [
        'Offentlig',
        'Ikke offentlig'
    ];

    constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {

        this.route.parent.params.subscribe(
            (params: Params) => {
                this.id = +(params['id']);
                this.editMode = params['id'] != null;  // if no id in params = false
                this.initForm();
            });

    };

    onSubmit(){

        if(this.editMode) {
            this.updateEvent();
        }
        else {
            this.addEvent();

        }

    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    addEvent() {

        let event : Event = this.eventForm.value;



        this.eventService.createEvent(this.eventForm.value, (callback: Event) => {
            // success
            this.router.navigate(["/events", callback.getId()])

        }, () => {

            // fail
            // display error message

        });
    }

    updateEvent() {

        this.eventService.updateEvent(this.eventForm.value, () => {
            // success
            this.router.navigate(["/events", this.id])

        }, () => {

            // fail
            // display error message

        });

    }

    private initForm() {

        let title       = "";
        let description = "";
        let address     = "";
        let imageURL    = "";
        let start       = new Date();
        let end         = new Date();
        let isPublic    = true;

        if (this.editMode) {

            this.eventService.getEvent(this.id, (event: Event) => {

                title       = event.title;
                description = event.description;
                address     = event.address;
                imageURL    = event.imageURL;
                start       = event.start;
                end         = event.end;
                isPublic    = event.isPublic;

            }, null);
        }

        this.eventForm = new FormGroup({

            'title':        new FormControl(title, Validators.required),
            'description':  new FormControl(description, Validators.required),
            'address':      new FormControl(address, Validators.required),
            'imageURL':     new FormControl(imageURL),
            'start':        new FormControl(start, Validators.required),
            'end':          new FormControl(end, Validators.required),
            'isPublic':     new FormControl(isPublic)

        });

    }
}
