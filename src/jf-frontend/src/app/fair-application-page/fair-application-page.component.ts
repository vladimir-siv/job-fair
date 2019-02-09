import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";
import { IFairInfo } from "../models/fair.model";

@Component
({
	selector: "fair-application-page",
	templateUrl: "./fair-application-page.component.html",
	styleUrls: ["./fair-application-page.component.css"]
})
export class FairApplicationPageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private db: DatabaseManagerService
	) { }
	
	private allowed: boolean = false;
	private fairinfo: IFairInfo;
	
	private package: number;
	private additional: string[] = [];
	
	ngOnInit()
	{
		this.db.env(response =>
		{
			if (response.env)
			{
				this.allowed = response.env.fair;
			}
		});
		
		this.db.currentfair(response =>
		{
			this.fairinfo = response.fair;
			
			if (this.fairinfo)
				for (let i = 0; i < this.fairinfo.additional.length; ++i)
					this.additional.push("");
		});
	}
	
	select(i: number)
	{
		this.additional[i] = this.additional[i] == "" ? "active" : "";
	}
	
	apply()
	{
		if (this.package == undefined)
		{
			this.context.app.showPromptAlert("danger", "Please, select a package to proceed.");
			return;
		}
		
		
	}
}
