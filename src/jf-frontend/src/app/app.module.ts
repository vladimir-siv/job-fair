import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { PopupsModule } from "./popups/popups.module";
import { InputsModule } from "./inputs/inputs.module";
import { AjaxModule } from "./ajax/ajax.module";

import { AppComponent } from "./app.component";
import { IndexPageComponent } from "./index-page/index-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule
({
	declarations:
	[
		AppComponent,
		IndexPageComponent,
		HomePageComponent,
		PageNotFoundComponent
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
