import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from "./app.routing";
import {SignInComponent} from "./sign-in/sign-in.component";
import {UserService} from "./user.service";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
