import { Component, Input } from '@angular/core';
import { Event } from "./event";

@Component({
  selector: 'es-event-thumbnail',
  templateUrl: 'event-thumbnail.component.html',
  styleUrls: ['event-thumbnail.component.css']
})
export class EventThumbnailComponent {

  @Input() event: Event;

  constructor() { }

}