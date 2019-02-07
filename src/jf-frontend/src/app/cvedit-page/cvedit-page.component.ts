import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { AccountManagerService } from "../ajax/services/account-manager.service";

@Component
({
	selector: "cvedit-page",
	templateUrl: "./cvedit-page.component.html",
	styleUrls: ["./cvedit-page.component.css"]
})
export class CVEditPageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private account: AccountManagerService
	) { }
	
	now() { return new Date(); }
	parse(date: string) { return new Date(date); }
	track(index: number, obj: any): any { return index; }
	
	cv = this.context.newappform;
	
	ngOnInit()
	{
		this.context.app.accinfo.fetch(value => this.cv = value.person.student.cv ? value.person.student.cv : this.cv);
	}
	
	update()
	{
		this.account.updatecv(this.cv, response =>
		{
			if (response.result == "success")
			{
				this.context.app.accinfo.fetch(value => value.person.student.cv = this.cv);
			}
			
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
}
