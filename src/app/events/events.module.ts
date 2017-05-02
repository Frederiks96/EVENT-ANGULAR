

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {EventsOverviewComponent} from "./events-overview/eventsoverview.component";
import {EventThumbnailComponent} from "./event/event-thumbnail.component";
import {EventEditComponent} from "./event-edit/event-edit.component";
import {ShowEventComponent} from "./show-event/show-event.component";
import {EventInvitationsComponent} from "./event-invitations/event-invitations.component";
import {EventInvitationSearchResultComponent} from "./event-invitations/event-invitation-search-result/event-invitation-search-result.component";
import {EventInvitationItemComponent} from "./event-invitations/event-invitation-item/event-invitation-item.component";
import {eventRoutes} from "./events.routing";
import {ShortStringPipe} from "../custom-pipes/short-string.pipe";


@NgModule({
    declarations: [
        EventsOverviewComponent,
        EventThumbnailComponent,
        EventEditComponent,
        ShowEventComponent,
        EventInvitationsComponent,
        EventInvitationSearchResultComponent,
        EventInvitationItemComponent,
        ShortStringPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        eventRoutes
    ]
})
export class EventsModule{}
