import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { IAccountInfo } from "../models/account.model";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";
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
		private company: CompanyService
	) { }
	
	now() { return new Date(); }
	parse(date: string) { return new Date(date); }
	track(index: number, obj: any): any { return index; }
	
	private accinfo: IAccountInfo;
	private data: IAccountInfo;
	private opening: number = 0;
	
	private cv = this.context.newappform;
	private textcover: string = "";
	
	ngOnInit()
	{
		this.context.app.accinfo.fetch(value => this.accinfo = value);
		
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
	
	fill()
	{
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
