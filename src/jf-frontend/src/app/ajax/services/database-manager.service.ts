import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IAccountInfo } from "../../models/account.model";

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
	
	public userinfo(username: string, callback: ((response: { info: IAccountInfo }) => void))
	{
		this.http.get<{ info: IAccountInfo }>("/db/users/" + username).subscribe(callback);
	}
	
	public companies(name: string, address: string, sectors: string[], callback: ((response: { results: { username: string, name: string }[] }) => void))
	{
		this.http.post<{ results: { username: string, name: string }[] }>("/db/companies", { name: name, address: address, sectors: sectors }).subscribe(callback);
	}
}
