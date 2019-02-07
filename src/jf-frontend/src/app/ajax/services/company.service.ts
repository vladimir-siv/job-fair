import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "../ajax.types";

@Injectable
({
	providedIn: "root"
})
export class CompanyService
{
	public constructor
	(
		private router: Router,
		private http: HttpClient
	) { }
	
	public publicize(form: FormData, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/company/new-opening", form).subscribe(callback);
	}
	
	public apply(form: FormData, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/company/apply", form).subscribe(callback);
	}
	
	public covertype(opening: number, index: number, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/company/cover-type", { opening: opening, index: index }).subscribe(callback);
	}
}
