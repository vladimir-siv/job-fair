import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";

import { PopupComponent } from "./popup/popup.component";
import { LoginPopupFeedComponent } from "./login-popup-feed/login-popup-feed.component";
import { AlertComponent } from './alert/alert.component';
import { PromptAlertFeedComponent } from '../popups/prompt-alert-feed/prompt-alert-feed.component';

@NgModule
({
	declarations:
	[
		PopupComponent,
		LoginPopupFeedComponent,
		AlertComponent,
		PromptAlertFeedComponent
	],
	imports:
	[
		CommonModule,
		FormsModule,
		ModalModule.forRoot()
	],
	exports:
	[
		PopupComponent,
		LoginPopupFeedComponent,
		AlertComponent,
		PromptAlertFeedComponent
	]
})
export class PopupsModule { }
