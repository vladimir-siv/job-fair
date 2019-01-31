import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AccountManagerService } from "./services/account-manager.service";

@NgModule
({
	declarations:
	[
		
	],
	imports:
	[
		CommonModule,
		HttpClientModule
	],
	providers:
	[
		AccountManagerService
	]
})
export class AjaxModule { }
