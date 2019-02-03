import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "../ajax.types";
import { IAccountInfo } from "../../models/account.model";

@Injectable
({
	providedIn: "root"
})
export class DatabaseManagerService
{
	constructor
	(
		private router: Router,
		private http: HttpClient
	) { }
	
	public userinfo(username: string, callback: ((response: { info: IAccountInfo }) => void))
	{
		this.http.get<{ info: IAccountInfo }>("/db/users/" + username).subscribe(callback);
	}
}
