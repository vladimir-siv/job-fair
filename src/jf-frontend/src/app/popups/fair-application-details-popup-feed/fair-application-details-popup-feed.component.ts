import { Component, Input } from "@angular/core";
import { PopupFeed } from "../PopupFeed";
import { DatabaseManagerService } from "src/app/ajax/services/database-manager.service";
import { IAccountInfo } from "src/app/models/account.model";
import { IFairInfo } from "src/app/models/fair.model";

@Component
({
	selector: "fair-application-details-popup-feed",
	templateUrl: "./fair-application-details-popup-feed.component.html",
	styleUrls: ["./fair-application-details-popup-feed.component.css"]
})
export class FairApplicationDetailsPopupFeedComponent extends PopupFeed
{
	public constructor
	(
		private db: DatabaseManagerService
	)
	{
		super();
	}
	
	@Input("accinfo") private accinfo: IAccountInfo;
	@Input("fairinfo") private fairinfo: IFairInfo;
	@Input("package") private package: number;
	@Input("additional") private additional: string[];
	
	private totalprice: number = 0;
	
	private prompts: { type: string, content: string }[];
	
	onShow()
	{
		super.onShow();
		
		this.totalprice = this.fairinfo.packages[this.package].price;
		for (let i = 0; i < this.additional.length; ++i)
			if (this.additional[i] == "active")
				this.totalprice += this.fairinfo.additional[i].price;
	}
	
	confirm()
	{
		let additional: number[] = [];
		for (let i = 0; i < this.additional.length; ++i)
			if (this.additional[i] == "active")
				additional.push(i);
		
		alert("OK hoss, wait for this to get implemented...");
	}
}
