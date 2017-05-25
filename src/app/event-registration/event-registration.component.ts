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
  public eventCode: string = "";
  public event: Event;
  private registered;
  public error: boolean = false;
  public success: boolean = false;
  private msg: string = "";
  public findmail: boolean = false;
  private autorized: boolean = false;
  private name: string = "";
  public counter: number = 0;
  private registeredContacts: RegisteredContacts = new RegisteredContacts;
  private redirectUrl = "http://www.google.it";
  private formModel: FormGroup;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) {
      let formObject = {
        'email': ['', Validators.email],
        'name': [this.name],
        'surname': ['']
      }
      this.formModel = fb.group(formObject);
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
    let form = this.formModel;
    if(form.value.name!=""){
      this.name=form.value.name;
    }
/*    this.registeredContacts.email = form.registrationData.email;
    this.registeredContacts.freeTextData = JSON.stringify({name: form.guestData.name, surname: form.guestData.surname});
    this.registeredContacts.eventsId = this.event.id;*/
    this.registeredContacts.email = form.get("email").value;
    this.registeredContacts.freeTextData = JSON.stringify({name: this.name});
    this.registeredContacts.eventsId = this.event.id;
    this.eventsService.addSubscription(this.registeredContacts).subscribe(
      res => {
        this.msg = "Operazione completata con successo!";
        this.success = true;
        //SEND MAIL SUCCESS
        console.log("The system sending mail to notify success.")
        this.counter = 10;
        let timer = Observable.timer(0,1000);
        timer.subscribe(t=> {
          this.counter = this.counter - 1 ;
          if(this.counter==0){
            window.location.href=this.redirectUrl;
          }
        });
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
              //this.formModel.patchValue({name: data.contacts[0].freeTextData});
            }
          }
        }
      )
    }
  }
}
