import { Injectable } from "@angular/core";
import { AppComponent } from "../app.component";

@Injectable
({
	providedIn: "root"
})
export class InjectionContext
{
	public readonly sectors: string[] =
	[
		"IT",
		"Telecommunication",
		"Energetics",
		"Construction & Architecture",
		"Mechanics"
	];
	
	private _app: AppComponent;
	public get app(): AppComponent { return this._app; }
	public set app(value: AppComponent) { if (!this._app) this._app = value; }
}
