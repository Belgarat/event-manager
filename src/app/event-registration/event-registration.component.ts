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
  private eventCode: string = "";
  private event: Event;
  private registered;
  private error: boolean = false;
  private success: boolean = false;
  private msg: string = "";
  private findmail: boolean = false;
  private registeredContacts: RegisteredContacts = new RegisteredContacts;
  /*formModel = new FormGroup({
    registrationData: new FormGroup({
      email: new FormControl()
    }),
    guestData: new FormGroup({  
      name: new FormControl(),
      surname: new FormControl()
    })
  })*/
  private formModel: FormGroup;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) {
      this.formModel = fb.group({
        'email': ['', Validators.email],
        'name': [''],
        'surname': ['']
      })
    }

  ngOnInit() {
    this.eventCode = this.route.snapshot.params["code"];
    if(this.eventCode){
      this.eventsService.getEventByCode(this.eventCode).subscribe(
        (data) => {
          this.event = data
        }, 
        (err) => {
          console.log(err.ok);
        });
      this.eventsService.getRegisteredByCode(this.eventCode).subscribe(
        (data) => {
          this.registered = data
        }, 
        (err) => {
          console.log(err.ok);
        });
    }
  }
  register(){
    let form = this.formModel.value;
/*    this.registeredContacts.email = form.registrationData.email;
    this.registeredContacts.freeTextData = JSON.stringify({name: form.guestData.name, surname: form.guestData.surname});
    this.registeredContacts.eventsId = this.event.id;*/
    this.registeredContacts.email = form.email;
    this.registeredContacts.freeTextData = JSON.stringify({name: form.name, surname: form.surname});
    this.registeredContacts.eventsId = this.event.id;

    this.eventsService.addSubscription(this.registeredContacts).subscribe(
      res => {
        this.msg = "Operazione completata con successo!";
        this.success = true;
      }, 
      err => {
        if(err){
          (err.status == 404)?this.msg = "Impossibile procedere, problemi di connessione con il server.":this.msg = "Errore sconosciuto";
          this.error = true;
        }
      });
  }

  search(){
    let field = this.formModel.value.email;
    this.findmail=false;
    if(field.search("@")>0){
      this.registered.registered.find((obj:any) => {
        (obj.email == field)?this.findmail=true:this.findmail=false;
      })
    }
  }
}
