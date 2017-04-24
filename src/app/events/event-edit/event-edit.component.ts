import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
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
    isPublic = true;
    editMode: boolean = false;
    event : Event;

    constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {

        this.route.parent.params.subscribe(
            (params: Params) => {
                this.editMode = params['id'] != null; // if no id in params = false
                this.id = +(params['id']);

                if(this.editMode) {
                    this.eventService.getEvent(this.id, (event: Event) => {
                        this.event = event;
                        console.log(event);
                    }, null);
                }
            });
    };

    onSubmit(form: NgForm){

        this.event = new Event(
            0,
            form.value.title,
            form.value.description,
            form.value.address,
            form.value.imageURL,
            Date.parse(form.value.start),
            Date.parse(form.value.end),
            this.isPublic
            );

        if(this.editMode) {
            this.event.setID(this.id);
            console.log(this.event);
            this.updateEvent(this.event);
        }
        else {
            console.log(this.event);
            this.addEvent(this.event);
        }

    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    addEvent(event: Event) {

        this.eventService.createEvent(event, (callback: Event) => {
            // success
            this.router.navigate(["/events", callback.getId()])

        }, () => {

            // fail
            // display error message

        });
    }

    updateEvent(event: Event) {

        this.eventService.updateEvent(event, () => {
            // success
            this.router.navigate(["/events", this.id])

        }, () => {

            // fail
            // display error message

        });

    }

    private togglePublic() {
        this.isPublic = !this.isPublic;
    }

   /* private initForm() {

        let title        = "";
        let description  = "";
        let address      = "";
        let imageURL     = "";
        let start        = 0;
        let end          = 0;
        let isPublic     = true;

        if (this.editMode) {

            this.eventService.getEvent(this.id, (event: Event) => {
                console.log(event);
                title       = event.title;
                description = event.description;
                address     = event.address;
                imageURL    = event.imageURL;
                start       = event.start;
                end         = event.end;
                isPublic    = event.isPublic;

                console.log(start);
                console.log(end);

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

    }*/
}
