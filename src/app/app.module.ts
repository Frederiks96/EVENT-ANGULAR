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

import { APIService } from './services/api.service';
import { UserService } from './services/user.service';
import {EventService} from './services/event.service';
import {InvitationService} from './services/invitation.service';
import {EventsModule} from "./events/events.module";
import {InvitesComponent} from "./invites/invites.component";


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        HeaderComponent,
        UserComponent,
        InvitesComponent,
        ContainerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        EventsModule,
        routes
    ],
    providers: [UserService, APIService, EventService, InvitationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
