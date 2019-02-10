import { Component, OnInit, ViewChild } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { AdminService } from "../ajax/services/admin.service";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";
import { FairInfo, IFairInfo } from "../models/fair.model";
import { HttpClient } from "@angular/common/http";
import { EventDetailsPopupFeedComponent } from "../popups/event-details-popup-feed/event-details-popup-feed.component";

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
		private db: DatabaseManagerService,
		private http: HttpClient
	) { }
	
	now() { return new Date(); }
	track(index: number, obj: any): any { return index; }
	status(index: number) { return this.current.applications[index].accepted == undefined ? "[new]" : ""; }
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
	
	@ViewChild("detailsf") private detailsf: EventDetailsPopupFeedComponent;
	
	private current: IFairInfo;
	private fairinfo: FairInfo = new FairInfo();
	private locations: { place: string }[] = [];
	
	ngOnInit()
	{
		this.admin.locations(response =>
		{
			this.locations = response.locations;
		});
		
		this.reloadcurrentfair();
	}
	
	// ======= FAIR =======
	
	reloadcurrentfair()
	{
		this.db.currentfair(response => this.current = response.fair);
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
	
	create(logo: FileList, images: FileList)
	{
		if (!logo)
		{
			this.context.app.showPromptAlert("danger", "Fair logo is not present.");
			return;
		}
		
		let form: FormData = new FormData();
		
		form.append("files[0]", logo[0], logo[0].name);
		if (images)
			for (let i = 0; i < images.length; ++i)
				form.append("files[" + (i + 1) + "]", images[i], images[i].name);
		
		form.append("fairinfo", JSON.stringify(this.fairinfo));
		
		this.admin.createfair(form, response =>
		{
			if (response.result == "success")
			{
				this.reloadcurrentfair();
			}
			
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
	
	update(i: number)
	{
		this.admin.updatemaxcompanies(i, this.current.packages[i].maxcompanies, response =>
		{
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
	
	// ======= EVENTS =======
	
	private selected: number;
	accept()
	{
		this.admin.acceptapplication(this.selected, this.current.applications[this.selected].events, response =>
		{
			if (response.result == "success")
			{
				this.current.applications[this.selected].accepted = true;
			}
			
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
	
	private oncomment = (comment: string) => this.reject(comment);
	reject(comment: string)
	{
		this.admin.rejectapplication(this.selected, comment, response =>
		{
			if (response.result == "success")
			{
				this.current.applications[this.selected].accepted = false;
				this.current.applications[this.selected].events = [];
			}
			
			this.context.app.hidePopup();
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
	
	edit(application: number, index: number)
	{
		this.detailsf.event =
		{
			application: application,
			index: index,
			locations: this.current.locations,
			data: this.current.applications[application].events[index]
		};
		
		this.context.app.showPopup(this.detailsf);
	}
	
	private ondetails = () => this.details();
	details()
	{
		if (this.current.applications[this.detailsf.event.application].accepted == undefined)
		{
			this.context.app.hidePopup();
			return;
		}
		
		this.admin.updateevent(this.detailsf.event.application, this.detailsf.event.index, this.detailsf.event.data, response =>
		{
			this.context.app.hidePopup();
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
	
	// ======= ENV =======
	
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
}
