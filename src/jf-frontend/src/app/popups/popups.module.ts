import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { InputsModule } from "../inputs/inputs.module";

import { PopupComponent } from "./popup/popup.component";
import { LoginPopupFeedComponent } from "./login-popup-feed/login-popup-feed.component";
import { RegisterPopupFeedComponent } from "../popups/register-popup-feed/register-popup-feed.component";
import { FairApplicationDetailsPopupFeedComponent } from "../popups/fair-application-details-popup-feed/fair-application-details-popup-feed.component";
import { EventDetailsPopupFeedComponent } from "../popups/event-details-popup-feed/event-details-popup-feed.component";
import { CommentPopupFeedComponent } from "../popups/comment-popup-feed/comment-popup-feed.component";
import { AlertComponent } from "./alert/alert.component";
import { PromptAlertFeedComponent } from "../popups/prompt-alert-feed/prompt-alert-feed.component";

@NgModule
({
	declarations:
	[
		PopupComponent,
		LoginPopupFeedComponent,
		RegisterPopupFeedComponent,
		FairApplicationDetailsPopupFeedComponent,
		EventDetailsPopupFeedComponent,
		CommentPopupFeedComponent,
		AlertComponent,
		PromptAlertFeedComponent
	],
	imports:
	[
		CommonModule,
		FormsModule,
		ModalModule.forRoot(),
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		InputsModule
	],
	exports:
	[
		PopupComponent,
		LoginPopupFeedComponent,
		RegisterPopupFeedComponent,
		FairApplicationDetailsPopupFeedComponent,
		EventDetailsPopupFeedComponent,
		CommentPopupFeedComponent,
		AlertComponent,
		PromptAlertFeedComponent
	]
})
export class PopupsModule { }
