import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { AdminService } from "../ajax/services/admin.service";
import { FairInfo } from "../models/fair.model";
import { HttpClient } from "@angular/common/http";

@Component
({
	selector: "admin-page",
	templateUrl: "./admin-page.component.html",
	styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private admin: AdminService,
		private http: HttpClient
	) { }
	
	track(index: number, obj: any): any { return index; }
	parse(datetime: string)
	{
		let dt = datetime.split('T');
		let date = new Date(dt[0]);
		let time = dt[1].split(':');
		date.setHours(parseInt(time[0]));
		date.setMinutes(parseInt(time[1]));
		date.setSeconds(parseInt(time[2]));
		return date;
	}
	
	private fairinfo: FairInfo = new FairInfo();
	private locations: { place: string }[] = [];
	
	ngOnInit()
	{
		this.admin.locations(response =>
		{
			this.locations = response.locations;
		});
	}
	
	load1()
	{
		
		this.http.get<any>("./assets/fairs/form1.json").subscribe(json =>
		{
			if
			(
				json == undefined
				||
				json.name == undefined
				||
				json.start == undefined
				||
				json.end == undefined
				||
				json.place == undefined
				||
				json.about == undefined
			)
			{
				this.context.app.showPromptAlert("danger", "Invalid file format.");
				return;
			}
			
			this.fairinfo.name = json.name;
			this.fairinfo.start = this.parse(json.start);
			this.fairinfo.end = this.parse(json.end);
			this.fairinfo.place = json.place;
			this.fairinfo.about = json.about;
		});
	}
	
	load2()
	{
		this.http.get<any>("./assets/fairs/form2.json").subscribe(json =>
		{
			if
			(
				json == undefined
				||
				json.packages == undefined
				||
				json.additional == undefined
			)
			{
				this.context.app.showPromptAlert("danger", "Invalid file format.");
				return;
			}
			
			this.fairinfo.packages = json.packages;
			this.fairinfo.additional = json.additional;
		});
	}
	
	cv(enabled: boolean)
	{
		this.admin.cv(enabled, response =>
		{
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
	
	fair(enabled: boolean)
	{
		this.admin.fair(enabled, response =>
		{
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
	
	create(logo: FileList, images: FileList)
	{
		if (!logo)
		{
			this.context.app.showPromptAlert("danger", "Fair logo is not present.");
			return;
		}
		
		
	}
}
