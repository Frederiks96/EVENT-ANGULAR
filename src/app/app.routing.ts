import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { ContainerComponent } from './container/container.component';
import { EventsOverviewComponent, ShowEventComponent, EventEditComponent } from './events';
import {InvitesComponent} from './invites/invites.component';
import {EventInvitationsComponent} from './events/event-invitations/event-invitations.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SignInComponent },
    { path: 'invites', component: InvitesComponent },

    { path: 'events',  component: ContainerComponent, children: [
        { path: '',    component: EventsOverviewComponent },
        { path: 'add', component: EventEditComponent },
        { path: ':id', component: ContainerComponent, children: [
            { path: '',            component: ShowEventComponent },
            { path: 'edit',        component: EventEditComponent },
            { path: 'invitations', component: EventInvitationsComponent }
        ]}
    ]},

    { path: 'user', component: ContainerComponent, children: [
        { path: '', component: UserComponent }
    ]},

    { path: '**', redirectTo: 'events' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);






