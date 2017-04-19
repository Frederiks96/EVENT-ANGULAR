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

import { APIService } from './services/api.service';
import { UserService } from './services/user.service';
import {EventService} from './services/event.service';


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
  providers: [UserService, APIService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
