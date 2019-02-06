import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { IAccountInfo } from "../models/account.model";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";

@Component
({
	selector: "opening-page",
	templateUrl: "./opening-page.component.html",
	styleUrls: ["./opening-page.component.css"]
})
export class OpeningPageComponent implements OnInit
{
	public constructor
	(
		private route: ActivatedRoute,
		private context: InjectionContext,
		private db: DatabaseManagerService
	) { }
	
	private data: IAccountInfo;
	private opening: number = 0;
	
	ngOnInit()
	{
		this.route.paramMap.subscribe(params =>
		{
			let company = params.get("company");
			
			if (company != null)
			{
				let opening = params.get("opening");
				
				if (opening != null)
				{
					this.opening = parseInt(opening);
				}
				
				this.db.userinfo(company, response => this.data = response.info);
			}
		});
	}
}
