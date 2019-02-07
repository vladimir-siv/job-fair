import { Injectable } from "@angular/core";
import { AppComponent } from "../app.component";

@Injectable
({
	providedIn: "root"
})
export class InjectionContext
{
	public readonly sectors: string[] =
	[
		"IT",
		"Telecommunication",
		"Energetics",
		"Construction & Architecture",
		"Mechanics"
	];
	
	private _app: AppComponent;
	public get app(): AppComponent { return this._app; }
	public set app(value: AppComponent) { if (!this._app) this._app = value; }
	
	private _appform =
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
		birth: new Date(),
		nationality: [""], // string[]
		
		applicationtype: "", // JOB APPLIED FOR, POSITION, PREFERRED JOB, STUDIES APPLIED FOR, PERSONAL STATEMENT
		description: "",
		
		work:
		[
			{
				from: new Date(),
				to: new Date(),
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
				from: new Date(),
				to: new Date(),
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
	
	public get newappform()
	{
		let self = this;
		return <typeof self._appform>jQuery.extend(true, { }, this._appform);
	}
}
