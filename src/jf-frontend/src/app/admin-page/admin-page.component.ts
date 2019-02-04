import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { AdminService } from "../ajax/services/admin.service";

@Component
({
	selector: "admin-page",
	templateUrl: "./admin-page.component.html",
	styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private admin: AdminService
	) { }
	
	ngOnInit() { }
	
	cv(enabled: boolean)
	{
		this.admin.cv(enabled, response =>
		{
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
}
