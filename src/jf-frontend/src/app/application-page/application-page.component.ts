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
	
	private databarrier = false;
	private cv = this.context.newappform;
	private covertype = "";
	
	private hired = false;
	
	ngOnInit()
	{
		// it is probably a good idea to resync with context.app._accinfo, but who cares
		this.account.resync(response =>
		{
			this.accinfo = response.info;
			this.signaldata();
		});
		
		this.route.paramMap.subscribe(params =>
		{
			let opening = params.get("opening");
			if (opening != null) this.opening = parseInt(opening);
			
			let index = params.get("index");
			if (index != null) this.index = parseInt(index);
			
			this.signaldata();
			
			this.company.covertype(this.opening, this.index, response =>
			{
				if (response.result == "success")
				{
					this.covertype = response.message;
				}
			});
		});
	}
	
	signaldata()
	{
		if (!this.databarrier)
		{
			this.databarrier = true;
			return;
		}
		
		this.cv = this.accinfo.company.openings[this.opening].applications[this.index].cv;
		this.hired = new Date(this.accinfo.company.openings[this.opening].applications[this.index]._on).valueOf() > new Date(this.accinfo.company.openings[this.opening].deadline).valueOf();
	}
	
	deadlineReached()
	{
		return Date.now() > new Date(this.accinfo.company.openings[this.opening].deadline).valueOf();
	}
	
	hire()
	{
		this.company.hire(this.opening, this.index, response =>
		{
			if (response.result == "success")
			{
				this.hired = true;
			}
			
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
}
