import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { PopupsModule } from "./popups/popups.module";
import { InputsModule } from "./inputs/inputs.module";
import { AjaxModule } from "./ajax/ajax.module";

import { AppComponent } from "./app.component";

@NgModule
({
	declarations:
	[
		AppComponent
	],
	imports:
	[
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		PopupsModule,
		InputsModule,
		AjaxModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
