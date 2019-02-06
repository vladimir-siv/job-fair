import { Component, OnInit } from "@angular/core";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";

@Component
({
	selector: "job-search-page",
	templateUrl: "./job-search-page.component.html",
	styleUrls: ["./job-search-page.component.css"]
})
export class JobSearchPageComponent implements OnInit
{
	public constructor
	(
		private db: DatabaseManagerService
	) { }
	
	private job: boolean = true;
	private internship: boolean = false;
	private name: string;
	private position: string;
	
	private results:
	{
		companies: { username: string, name: string } [],
		openings: { username: string, index: number, position: string }[],
	};
	
	ngOnInit() { }
	
	search()
	{
		this.db.jobs(this.job, this.internship, this.name, this.position, response =>
		{
			this.results = response.results;
		});
	}
}
