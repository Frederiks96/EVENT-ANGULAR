import {Routes, RouterModule} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {EventsComponent} from "./events/events.component";
import {EventAddComponent} from "./events/event-add/event-add.component";


const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'signin', pathMatch: 'full'},
    {path: 'signin', component: SignInComponent},
    {path: 'home', component: HomeComponent},
    {path: 'events', component: EventsComponent},
    {path: 'user', component: HomeComponent},
    {path: 'eventAdd', component: EventAddComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
