import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
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
  private autorized: boolean = false;
  private name: string = "";
  private counter: number = 10;
  private registeredContacts: RegisteredContacts = new RegisteredContacts;
  /*formModel = new FormGroup({
    registrationData: new FormGroup({
      email: new FormControl()
    }),
    guestData: new FormGroup({  
      name: new FormControl(),
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
    /*let timer = Observable.timer(0,1000);
    timer.subscribe(t=> {
      this.counter = this.counter - 1 ;
      if(this.counter==0){
        window.location.href="http://www.google.it";
      }
    });*/
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
        this.eventsService.getRegisteredByCode(this.eventCode).subscribe(
          (data) => {
            this.registered = data
          }, 
          (err) => {
            console.log(err.ok);
          });
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
    this.autorized=false;
    if(field.search("@")>0){
      this.eventsService.getEventContacts(this.eventCode,field).subscribe(
        (data) => {
          if(data.contacts.length > 0){
            var email = this.registered.registered.find((obj:any) => {
              if(obj.email == field){
                return true;
              }
            })
            console.log(email);
            if(email){
                this.findmail=true;
                this.autorized = false;
            }else{
              this.findmail=false;
              this.autorized=true;
              this.name = data.contacts[0].freeTextData;
            }
          }
        }
      )
    }
  }
}
