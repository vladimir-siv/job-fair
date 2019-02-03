import { Injectable } from "@angular/core";
import { AppComponent } from "../app.component";
import { IAccountInfo } from "../models/account.model";

@Injectable
({
	providedIn: "root"
})
export class InjectionContext
{
	private _app: AppComponent;
	public get app(): AppComponent { return this._app; }
	public set app(value: AppComponent) { if (!this._app) this._app = value; }
}
