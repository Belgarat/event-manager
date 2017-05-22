import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event.model';
import { RegisteredContacts } from '../models/registeredContacts.model';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  private eventId: number = 0;
  private event: Event;
  private registeredContacts: RegisteredContacts = new RegisteredContacts;
  formModel = new FormGroup({
    registrationData: new FormGroup({
      email: new FormControl()
    }),
    guestData: new FormGroup({  
      name: new FormControl(),
      surname: new FormControl()
    })
  })

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    let id: number = this.route.snapshot.params["id"];
    if(id){
      this.eventId = id;
      this.eventsService.getEvent(id).subscribe(data => this.event = data);
    }
  }
  register(){
    let form = this.formModel.value;
    console.log(form);
    this.registeredContacts.email = form.registrationData.email;
    this.registeredContacts.freeTextData = form.guestData.name + " " + form.guestData.surname;
    this.registeredContacts.eventId = this.eventId;
    this.registeredContacts.eventsId = 0;
    console.log(this.registeredContacts);
    this.eventsService.addSubscription(this.registeredContacts).subscribe(res => console.log(res), err => console.log(err));
  }
}
