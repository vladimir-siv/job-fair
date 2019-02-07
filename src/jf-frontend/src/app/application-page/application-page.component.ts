import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { IAccountInfo } from "../models/account.model";
import { AccountManagerService } from "../ajax/services/account-manager.service";
import { CompanyService } from "../ajax/services/company.service";

@Component
({
	selector: "application-page",
	templateUrl: "./application-page.component.html",
	styleUrls: ["./application-page.component.css"]
})
export class ApplicationPageComponent implements OnInit
{
	public constructor
	(
		private route: ActivatedRoute,
		private context: InjectionContext,
		private account: AccountManagerService,
		private company: CompanyService
	) { }
	
	now() { return new Date(); }
	parse(date: string) { return new Date(date); }
	track(index: number, obj: any): any { return index; }
	millis(date: Date) { return new Date(date).valueOf(); }
	
	private accinfo: IAccountInfo;
	private opening: number = 0;
	private index: number = 0;
	
	private cvbarrier = false;
	private cv = this.context.newappform;
	private covertype = "";
	
	ngOnInit()
	{
		// it is probably a good idea to resync with context.app._accinfo, but who cares
		this.account.resync(response =>
		{
			this.accinfo = response.info;
			this.signalCv();
		});
		
		this.route.paramMap.subscribe(params =>
		{
			let opening = params.get("opening");
			if (opening != null) this.opening = parseInt(opening);
			
			let index = params.get("index");
			if (index != null) this.index = parseInt(index);
			
			this.signalCv();
			
			this.company.covertype(this.opening, this.index, response =>
			{
				if (response.result == "success")
				{
					this.covertype = response.message;
				}
			});
		});
	}
	
	signalCv()
	{
		if (!this.cvbarrier)
		{
			this.cvbarrier = true;
			return;
		}
		
		this.cv = this.accinfo.company.openings[this.opening].applications[this.index].cv;
	}
	
	deadlineReached()
	{
		return Date.now() > new Date(this.accinfo.company.openings[this.opening].deadline).valueOf();
	}
}
