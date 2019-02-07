import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { PopupsModule } from "./popups/popups.module";
import { InputsModule } from "./inputs/inputs.module";
import { AjaxModule } from "./ajax/ajax.module";

import { AppComponent } from "./app.component";
import { IndexPageComponent } from "./index-page/index-page.component";
import { CompaniesPageComponent } from "./companies-page/companies-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { CVEditPageComponent } from "./cvedit-page/cvedit-page.component";
import { JobSearchPageComponent } from "./job-search-page/job-search-page.component";
import { NewOpeningPageComponent } from "./new-opening-page/new-opening-page.component";
import { OpeningPageComponent } from "./opening-page/opening-page.component";
import { ApplicationPageComponent } from "./application-page/application-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { InjectionContext } from "./DependencyInjection/injection-context.service";

@NgModule
({
	declarations:
	[
		AppComponent,
		IndexPageComponent,
		CompaniesPageComponent,
		HomePageComponent,
		ProfilePageComponent,
		CVEditPageComponent,
		JobSearchPageComponent,
		NewOpeningPageComponent,
		OpeningPageComponent,
		ApplicationPageComponent,
		AdminPageComponent,
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
	providers:
	[
		InjectionContext
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
