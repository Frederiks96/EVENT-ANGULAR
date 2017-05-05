import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { ContainerComponent } from './container/container.component';
import { EventsOverviewComponent, EventThumbnailComponent, EventEditComponent, ShowEventComponent } from './events';

import { APIService } from './services/api.service';
import { UserService } from './services/user.service';
import {EventService} from './services/event.service';
import { EventInvitationsComponent } from './events/event-invitations/event-invitations.component';
import { EventInvitationSearchResultComponent } from './events/event-invitations/event-invitation-search-result/event-invitation-search-result.component';
import { EventInvitationItemComponent } from './events/event-invitations/event-invitation-item/event-invitation-item.component';
import {InvitationService} from './services/invitation.service';
import {InvitesComponent} from './invites/invites.component';
import {ShortStringPipe} from './custom-pipes/short-string.pipe';


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        HeaderComponent,
        EventsOverviewComponent,
        EventThumbnailComponent,
        EventEditComponent,
        UserComponent,
        ContainerComponent,
        ShowEventComponent,
        EventInvitationsComponent,
        EventInvitationSearchResultComponent,
        EventInvitationItemComponent,
        InvitesComponent,
        ShortStringPipe
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
