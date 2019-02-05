import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "../ajax.types";

@Injectable
({
	providedIn: "root"
})
export class AdminService
{
	public constructor
	(
		private router: Router,
		private http: HttpClient
	) { }
	
	public cv(enabled: boolean, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/admin/update-cv", { cv: enabled }).subscribe(callback);
	}
}