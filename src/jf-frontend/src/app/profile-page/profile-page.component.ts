import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { IAccountInfo } from "../models/account.model";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";

@Component
({
	selector: "profile-page",
	templateUrl: "./profile-page.component.html",
	styleUrls: ["./profile-page.component.css"]
})
export class ProfilePageComponent implements OnInit
{
	public constructor
	(
		private route: ActivatedRoute,
		private context: InjectionContext,
		private db: DatabaseManagerService
	) { }
	
	private data: IAccountInfo;
	
	ngOnInit()
	{
		this.route.paramMap.subscribe(params =>
		{
			let username = params.get("username");
			
			if (username != null)
			{
				this.db.userinfo(username, response => this.data = response.info);
			}
			else
			{
				this.context.app.accinfo.subscribe(value => this.data = value);
			}
		});
	}
}
