import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IAccountInfo } from "../../models/account.model";
import { IFairInfo } from "../../models/fair.model";

@Injectable
({
	providedIn: "root"
})
export class DatabaseManagerService
{
	public constructor
	(
		private router: Router,
		private http: HttpClient
	) { }
	
	public env(callback: ((response: { env: { cv: boolean, fair: boolean } }) => void))
	{
		this.http.get<{ env: { cv: boolean, fair: boolean } }>("/db/env").subscribe(callback);
	}
	
	public userinfo(username: string, callback: ((response: { info: IAccountInfo }) => void))
	{
		this.http.get<{ info: IAccountInfo }>("/db/users/" + username).subscribe(callback);
	}
	
	public companies(name: string, address: string, sectors: string[], callback: ((response: { results: { username: string, name: string }[] }) => void))
	{
		this.http.post<{ results: { username: string, name: string }[] }>("/db/companies", { name: name, address: address, sectors: sectors }).subscribe(callback);
	}
	
	public jobs(job: boolean, internship: boolean, name: string, position: string, callback: ((response: { results: any }) => void))
	{
		this.http.post<{ results: any }>("/db/jobs", { job: job, internship: internship, name: name, position: position }).subscribe(callback);
	}
	
	public currentfair(callback: ((response: { fair: IFairInfo }) => void))
	{
		this.http.get<{ fair: IFairInfo }>("/db/current-fair").subscribe(callback);
	}
}
