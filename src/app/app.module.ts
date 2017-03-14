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
import { EventsOverviewComponent } from './events/events-overview/eventsoverview.component';
import { EventThumbnailComponent } from './events/event/event-thumbnail.component';
import {APIService} from "../services/api.service";
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { UserComponent } from './user/user.component';
import { ContainerComponent } from './container/container.component';
import { ShowEventComponent } from './events/show-event/show-event.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HeaderComponent,
    HomeComponent,
    EventsOverviewComponent,
    EventThumbnailComponent,
    EventEditComponent,
    UserComponent,
    ContainerComponent,
    ShowEventComponent
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
