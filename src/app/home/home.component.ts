import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";

@Component({
  selector: 'es-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

}
