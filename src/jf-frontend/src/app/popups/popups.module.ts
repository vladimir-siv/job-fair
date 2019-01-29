import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";

import { PopupComponent } from "./popup/popup.component";
import { LoginPopupFeedComponent } from "./login-popup-feed/login-popup-feed.component";

@NgModule
({
	declarations:
	[
		PopupComponent,
		LoginPopupFeedComponent
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
		LoginPopupFeedComponent
	]
})
export class PopupsModule { }
