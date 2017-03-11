import { Component, OnInit } from '@angular/core';
import { Event } from "./event/event";

@Component({
  selector: 'es-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [
    new Event('My event', 'This is a description', new Date(), new Date(), 'My secret place'),
    new Event('My event 2', 'This is also a description', new Date(), new Date(), 'My other secret place')
  ];

  constructor() { }

  ngOnInit() {
  }

}
