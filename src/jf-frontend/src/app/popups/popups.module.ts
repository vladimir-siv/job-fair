import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { InputsModule } from "../inputs/inputs.module";

import { PopupComponent } from "./popup/popup.component";
import { LoginPopupFeedComponent } from "./login-popup-feed/login-popup-feed.component";
import { RegisterPopupFeedComponent } from "../popups/register-popup-feed/register-popup-feed.component";
import { FairApplicationDetailsPopupFeedComponent } from "../popups/fair-application-details-popup-feed/fair-application-details-popup-feed.component";
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
		AlertComponent,
		PromptAlertFeedComponent
	],
	imports:
	[
		CommonModule,
		FormsModule,
		ModalModule.forRoot(),
		InputsModule
	],
	exports:
	[
		PopupComponent,
		LoginPopupFeedComponent,
		RegisterPopupFeedComponent,
		FairApplicationDetailsPopupFeedComponent,
		AlertComponent,
		PromptAlertFeedComponent
	]
})
export class PopupsModule { }
