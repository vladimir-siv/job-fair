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
	
	cv =
	{
		firstnames: "",
		surnames: "",
		streetaddress: "",
		postalcode: "",
		city: "",
		country: "",
		telephones:
		[
			{
				type: "", // Home, Work, Mobile
				number: ""
			}
		],
		email: "",
		links: [""], // string[]: linkedin, github, ...
		messaging:
		[
			{
				provider: "", // Google Hangouts, Skype, ICQ, AIM, MSN, YIM
				username: ""
			}
		],
		sex: "",
		birth: this.now(),
		nationality: [""], // string[]
		
		applicationtype: "", // JOB APPLIED FOR, POSITION, PREFERRED JOB, STUDIES APPLIED FOR, PERSONAL STATEMENT
		description: "",
		
		work:
		[
			{
				from: this.now(),
				to: this.now(),
				position: "",
				employer: "",
				city: "",
				country: "",
				streetaddress: "",
				postalcode: "",
				website: "",
				sector: "",
				activities: "" // textarea
			}
		],
		
		education:
		[
			{
				from: this.now(),
				to: this.now(),
				qualification: "",
				organization: "", // high school, collage
				city: "",
				country: "",
				streetaddress: "",
				postalcode: "",
				website: "",
				eqf: 0, // 1..8
				subjects: "", // textarea
				field: ""
			}
		],
		
		nativelanguages: [""], // string[]
		foreignlanguages:
		[
			{
				language: "",
				listening: "", // A1, A2, B1, B2, C1, C2
				reading: "", // A1, A2, B1, B2, C1, C2
				interaction: "", // A1, A2, B1, B2, C1, C2
				production: "", // A1, A2, B1, B2, C1, C2
				writing: "", // A1, A2, B1, B2, C1, C2
				certificates: [""] // string[]
			}
		],
		
		communicationskills: "", // textarea
		organizationalskills: "", // textarea
		jobskills: "", // textarea
		digitalskills:
		{
			infoprocessing: "", // Basic user, Independent user, Proficient user
			communication: "", // Basic user, Independent user, Proficient user
			contentcreation: "", // Basic user, Independent user, Proficient user
			safety: "", // Basic user, Independent user, Proficient user
			problemsolving: "", // Basic user, Independent user, Proficient user
			certificates: [""], // string[]
			other: "" // textarea
		}
	};
	
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
