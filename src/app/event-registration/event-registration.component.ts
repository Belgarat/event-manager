import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event.model'

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  private event: Event;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    let id: number = this.route.snapshot.params["id"];
    if(id){
      this.eventsService.getEvent(id).subscribe(data => this.event = data);
    }
  }
}
