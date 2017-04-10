import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'es-events',
  templateUrl: 'eventsoverview.component.html',
  styleUrls: ['eventsoverview.component.css']
})
export class EventsOverviewComponent implements OnInit {

  public events : Event[];

  constructor(private api : APIService) { }

  ngOnInit()
  {
      this.api.fetchEvents((events : Event[]) =>
      {
          this.events = events;
      }, null);
  }

}
