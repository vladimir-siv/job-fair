import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { IAccountInfo } from "../models/account.model";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";
import { CompanyService } from "../ajax/services/company.service";
import { RatingComponent } from "../inputs/rating/rating.component";

@Component
({
	selector: "profile-page",
	templateUrl: "./profile-page.component.html",
	styleUrls: ["./profile-page.component.css"]
})
export class ProfilePageComponent implements OnInit
{
	public constructor
	(
		private route: ActivatedRoute,
		private context: InjectionContext,
		private db: DatabaseManagerService,
		private company: CompanyService,
	) { }
	
	@ViewChild("rating") private rating: RatingComponent;
	@ViewChild("rate") private rate: RatingComponent;
	
	private accinfo: IAccountInfo;
	private data: IAccountInfo;
	
	private ratingsbarrier: boolean = false;
	private avgfirstupdate: boolean = false;
	private ratevalue: number = -1;
	
	ngOnInit()
	{
		this.context.app.accinfo.fetch(value =>
		{
			this.accinfo = value;
			this.updateratings();
		});
		
		this.route.paramMap.subscribe(params =>
		{
			let username = params.get("username");
			
			if (username != null)
			{
				this.db.userinfo(username, response =>
				{
					this.data = response.info;
					this.updateratings();
				});
			}
			else
			{
				this.context.app.accinfo.fetch(value =>
				{
					this.data = value;
					this.updateratings();
				});
			}
		});
	}
	
	ngDoCheck()
	{
		if (this.rating && this.avgfirstupdate)
		{
			this.updateavg();
			this.avgfirstupdate = false;
		}
	}
	
	updateratings()
	{
		if (!this.ratingsbarrier)
		{
			this.ratingsbarrier = true;
			return;
		}
		
		if (this.accinfo && this.accinfo.person && this.accinfo.person.student && this.data.company)
		{
			this.company.fetchrating(this.data.username, response =>
			{
				this.ratevalue = response.rating != -1 ? response.rating : 0;
				this.rate.value = this.ratevalue;
			});
		}
		
		this.avgfirstupdate = true;
	}
	
	updateavg()
	{
		if (this.data.company && this.data.company.ratings)
		{
			let avg = 0;
			
			if (this.data.company.ratings.length > 0)
			{
				for (let i = 0; i < this.data.company.ratings.length; ++i)
				{
					avg += this.data.company.ratings[i].rating;
				}
				
				avg /= this.data.company.ratings.length;
			}
			
			this.rating.value = avg;
		}
	}
	
	applyrate(rating: number)
	{
		if (!this.accinfo) return;
		
		if (this.ratevalue == -1)
		{
			this.rate.value = 0;
			return;
		}
		
		if (this.ratevalue != 0)
		{
			this.context.app.showPromptAlert("danger", "You have already rated this company!");
			return;
		}
		
		this.company.rate(this.data.username, rating, response =>
		{
			if (response.result == "success")
			{
				this.rate.mode = "insensitive";
				this.ratevalue = rating;
				
				if (!this.data.company.ratings)
				{
					this.data.company.ratings = [];
				}
				
				this.data.company.ratings.push({ username: this.accinfo.username, rating: rating });
				this.updateavg();
			}
			else this.rate.value = 0;
			
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
}
