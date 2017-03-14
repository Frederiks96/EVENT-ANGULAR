import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from "./app.routing";
import {SignInComponent} from "./sign-in/sign-in.component";
import {UserService} from "../services/user.service";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import {APIService} from "../services/api.service";
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventsContainerComponent } from './events/eventscontainer/eventscontainer.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HeaderComponent,
    HomeComponent,
    EventsComponent,
    EventComponent,
    EventAddComponent,
    EventsContainerComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [UserService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
