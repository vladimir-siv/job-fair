import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexPageComponent } from "./index-page/index-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { CompaniesPageComponent } from "./companies-page/companies-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes =
[
	{ path: "", redirectTo: "index", pathMatch: "full" },
	{ path: "index", component: IndexPageComponent },
	{ path: "home", component: HomePageComponent, },
	{ path: "companies", component: CompaniesPageComponent },
	{ path: "profile", component: ProfilePageComponent },
	{ path: "profile/:username", component: ProfilePageComponent },
	{ path: "**", component: PageNotFoundComponent }
];

@NgModule
({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
