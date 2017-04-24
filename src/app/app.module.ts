import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ContainerComponent } from './container/container.component';
import { EventsOverviewComponent, EventThumbnailComponent, EventEditComponent, ShowEventComponent } from './events';

import { EventInvitationsComponent } from './events/event-invitations/event-invitations.component';
import { EventInvitationSearchResultComponent } from './events/event-invitations/event-invitation-search-result/event-invitation-search-result.component';
import { EventInvitationItemComponent } from './events/event-invitations/event-invitation-item/event-invitation-item.component';
import {InvitationService} from "./services/invitation-service.service";
import { InvitesComponent } from './invites/invites.component';
import {UserService} from "./services/user.service";
import {APIService} from "./services/api.service";
import {EventService} from "./services/event.service";


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
    ShowEventComponent,
    InvitesComponent,
    EventInvitationsComponent,
    EventInvitationSearchResultComponent,
    EventInvitationItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [UserService, APIService, EventService, InvitationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
