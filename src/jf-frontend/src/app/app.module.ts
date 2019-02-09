import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
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
import { FairApplicationPageComponent } from "./fair-application-page/fair-application-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { OWL_DATE_TIME_LOCALE } from "ng-pick-datetime";
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
		FairApplicationPageComponent,
		AdminPageComponent,
		PageNotFoundComponent
	],
	imports:
	[
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		MatStepperModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		PopupsModule,
		InputsModule,
		AjaxModule
	],
	providers:
	[
		{ provide: OWL_DATE_TIME_LOCALE, useValue: "sr" },
		InjectionContext
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
