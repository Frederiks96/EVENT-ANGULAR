
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {ContainerComponent} from "../container/container.component";
import {EventsOverviewComponent} from "./events-overview/eventsoverview.component";
import {EventEditComponent} from "./event-edit/event-edit.component";
import {ShowEventComponent} from "./show-event/show-event.component";
import {EventInvitationsComponent} from "./event-invitations/event-invitations.component";


const EVENT_ROUTES: Routes = [
    { path: 'events',  component: ContainerComponent, children: [
        { path: '',    component: EventsOverviewComponent },
        { path: 'add', component: EventEditComponent },
        { path: ':id', component: ContainerComponent, children: [
            { path: '',            component: ShowEventComponent },
            { path: 'edit',        component: EventEditComponent },
            { path: 'invitations', component: EventInvitationsComponent }
        ]}
    ]},
];

export const eventRoutes: ModuleWithProviders = RouterModule.forRoot(EVENT_ROUTES);
