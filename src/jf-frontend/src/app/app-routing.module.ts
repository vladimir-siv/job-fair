import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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

const routes: Routes =
[
	{ path: "", redirectTo: "index", pathMatch: "full" },
	{ path: "index", component: IndexPageComponent },
	{ path: "companies", component: CompaniesPageComponent },
	{ path: "home", component: HomePageComponent, },
	{ path: "profile", component: ProfilePageComponent },
	{ path: "profile/:username", component: ProfilePageComponent },
	{ path: "cvedit", component: CVEditPageComponent },
	{ path: "job-search", component: JobSearchPageComponent },
	{ path: "new-opening", component: NewOpeningPageComponent },
	{ path: "opening/:company/:opening", component: OpeningPageComponent },
	{ path: "application/:opening/:index", component: ApplicationPageComponent },
	{ path: "fair-application", component: FairApplicationPageComponent },
	{ path: "admin", component: AdminPageComponent },
	{ path: "**", component: PageNotFoundComponent }
];

@NgModule
({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
