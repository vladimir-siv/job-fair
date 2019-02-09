import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";

@Component
({
	selector: "home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private db: DatabaseManagerService
	) { }
	
	private cv: string = "unknown";
	private fair: string = "unknown";
	
	ngOnInit()
	{
		this.db.env(response =>
		{
			if (response.env)
			{
				this.cv = response.env.cv ? "enabled" : "disabled";
				this.fair = response.env.fair ? "enabled" : "disabled";
			}
		});
	}
}
