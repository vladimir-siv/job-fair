import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { DatabaseManagerService } from "../ajax/services/database-manager.service";

@Component
({
	selector: "companies-page",
	templateUrl: "./companies-page.component.html",
	styleUrls: ["./companies-page.component.css"]
})
export class CompaniesPageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private db: DatabaseManagerService
	) { }
	
	private name: string = "";
	private address: string = "";
	private sectors: { [key: string]: boolean } = {};
	
	private results: { username: string, name: string }[];
	
	ngOnInit()
	{
		for (let i = 0; i < this.context.sectors.length; ++i)
		{
			this.sectors[this.context.sectors[i]] = true;
		}
	}
	
	search()
	{
		let sectors: string[] = [];
		
		let sectorKeys = Object.keys(this.sectors);
		for (let i = 0; i < sectorKeys.length; ++i)
		{
			if (this.sectors[sectorKeys[i]])
			{
				sectors.push(sectorKeys[i]);
			}
		}
		
		this.db.companies(this.name, this.address, sectors, response =>
		{
			this.results = response.results;
		});
	}
}
