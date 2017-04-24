import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'es-events',
  templateUrl: 'eventsoverview.component.html',
  styleUrls: ['eventsoverview.component.css']
})
export class EventsOverviewComponent implements OnInit {

  public events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
      this.eventService.getEvents((events: Event[]) => {
          this.events = events;
      }, null);
  }

}
