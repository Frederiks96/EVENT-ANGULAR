import {Routes, RouterModule} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {EventsComponent} from "./events/events.component";


const APP_ROUTES: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'user', component: HomeComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
