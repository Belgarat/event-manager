import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { EventsService } from './services/events.service';
import { EventsComponent } from './events/events.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
