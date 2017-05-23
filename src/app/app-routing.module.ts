import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'event', component: EventRegistrationComponent },
  { path: 'event/:code', component: EventRegistrationComponent },
  /*{ path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}