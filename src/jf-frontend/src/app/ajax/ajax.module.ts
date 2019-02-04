import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AccountManagerService } from "./services/account-manager.service";
import { DatabaseManagerService } from "./services/database-manager.service";
import { DevService } from "./services/dev.service";

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
		AccountManagerService,
		DatabaseManagerService,
		DevService
	]
})
export class AjaxModule { }
