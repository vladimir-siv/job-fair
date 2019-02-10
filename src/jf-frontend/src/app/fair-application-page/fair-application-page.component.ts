import { Component, OnInit, ViewChild } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";
import { IAccountInfo } from "../models/account.model";
import { IFairInfo } from "../models/fair.model";
import { FairApplicationDetailsPopupFeedComponent } from "../popups/fair-application-details-popup-feed/fair-application-details-popup-feed.component";

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
	
	@ViewChild("confirm") private confirm: FairApplicationDetailsPopupFeedComponent;
	
	private accinfo: IAccountInfo;
	
	private allowed: boolean = false;
	private fairinfo: IFairInfo;
	
	private package: number;
	private additional: string[] = [];
	
	private applicationbarrier: boolean = false;
	private application: any;
	
	ngOnInit()
	{
		this.context.app.accinfo.fetch(value =>
		{
			this.accinfo = value;
			this.checkapplication();
		});
		
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
			
			this.checkapplication();
		});
	}
	
	checkapplication()
	{
		if (!this.applicationbarrier)
		{
			this.applicationbarrier = true;
			return;
		}
		
		if (!this.fairinfo) return;
		
		for (let i = 0; i < this.fairinfo.applications.length; ++i)
		{
			if (this.fairinfo.applications[i].company == this.accinfo.username)
			{
				this.application = this.fairinfo.applications[i];
				
				this.package = this.fairinfo.applications[i].package;
				for (let a = 0; a < this.fairinfo.applications[i].additional.length; ++a)
					this.additional[this.fairinfo.applications[i].additional[a]] = "active";
				
				return;
			}
		}
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
		
		this.context.app.showPopup(this.confirm);
	}
}
