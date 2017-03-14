import {Routes, RouterModule} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {EventsOverviewComponent} from "./events/events-overview/eventsoverview.component";
import {EventEditComponent} from "./events/event-edit/event-edit.component";
import {UserComponent} from "./user/user.component";
import {ContainerComponent} from "./container/container.component";
import {ShowEventComponent} from "./events/show-event/show-event.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SignInComponent },
    { path: 'home', component: HomeComponent },

    { path: 'events', component: ContainerComponent, children: [
        { path: '', component: EventsOverviewComponent },
        { path: 'add', component: EventEditComponent },
        { path: ':id', component: ContainerComponent, children: [
            { path: '', component: ShowEventComponent },
            { path: 'edit', component: EventEditComponent }
        ] }
    ]},

    { path: 'user', component: ContainerComponent, children: [
        { path: '', component: UserComponent }
    ]},

    { path: '**', redirectTo: 'home' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
