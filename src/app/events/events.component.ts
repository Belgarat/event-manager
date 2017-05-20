import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event.model'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  private events: Event[];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.findAll().subscribe(data => this.events = data);
    console.log(this.events);
  }

}
