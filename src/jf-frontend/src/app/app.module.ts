import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PopupsModule } from "./popups/popups.module";

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
		HttpClientModule,
		PopupsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
