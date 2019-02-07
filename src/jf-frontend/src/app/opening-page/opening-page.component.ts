import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { IAccountInfo } from "../models/account.model";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";
import { AccountManagerService } from "../ajax/services/account-manager.service";
import { CompanyService } from "../ajax/services/company.service";

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
		private db: DatabaseManagerService,
		private account: AccountManagerService,
		private company: CompanyService
	) { }
	
	now() { return new Date(); }
	parse(date: string) { return new Date(date); }
	track(index: number, obj: any): any { return index; }
	hired(application: any) { return new Date(application._on).valueOf() > new Date(this.data.company.openings[this.opening].deadline).valueOf() ? "yes" : "no"; }
	
	private accinfo: IAccountInfo;
	private data: IAccountInfo;
	private opening: number = 0;
	
	private cv = this.context.newappform;
	private textcover: string = "";
	
	private applicationsbarrier = false;
	
	ngOnInit()
	{
		// it is probably a good idea to resync with context.app._accinfo, but who cares
		this.account.resync(response =>
		{
			this.accinfo = response.info;
			this.tryfetchapplications();
		});
		//this.context.app.accinfo.fetch(value => this.accinfo = value);
		
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
				
				this.db.userinfo(company, response =>
				{
					this.data = response.info;
					this.tryfetchapplications();
				});
			}
		});
	}
	
	tryfetchapplications()
	{
		if (!this.applicationsbarrier)
		{
			this.applicationsbarrier = true;
			return;
		}
		
		this.company.applications(this.data.username, this.opening, response =>
		{
			this.data.company.openings[this.opening].applications = response.applications;
		});
	}
	
	deadlineReached()
	{
		return Date.now() > new Date(this.data.company.openings[this.opening].deadline).valueOf();
	}
	
	fill()
	{
		if (!this.accinfo.person.student.cv)
		{
			this.context.app.showPromptAlert("danger", "You do not have a CV set.");
			return;
		}
		
		this.cv = this.accinfo.person.student.cv;
	}
	
	apply(filecover: FileList)
	{
		if (!this.accinfo || !this.data)
		{
			this.context.app.showPromptAlert("danger", "Cannot apply for the position yet! Please, wait for the page to get initialized.");
			return;
		}
		
		let form: FormData = new FormData();
		
		form.append("company", this.data.username);
		form.append("opening", this.opening + "");
		form.append("username", this.accinfo.username);
		form.append("cv", JSON.stringify(this.cv));
		form.append("textcover", this.textcover);
		
		if (filecover && filecover.length == 1)
		{
			form.append("files[0]", filecover[0], filecover[0].name);
		}
		
		this.company.apply(form, response =>
		{
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
}
