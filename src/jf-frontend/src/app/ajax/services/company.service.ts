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
	
	public applications(company: string, opening: number, callback: ((response: { applications: any }) => void))
	{
		this.http.post<{ applications: any }>("/company/applications", { company: company, opening: opening }).subscribe(callback);
	}
	
	public covertype(opening: number, index: number, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/company/cover-type", { opening: opening, index: index }).subscribe(callback);
	}
	
	public hire(opening: number, index: number, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/company/hire", { opening: opening, index: index }).subscribe(callback);
	}
	
	public rate(company: string, rating: number, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/company/rate", { company: company, rating: rating }).subscribe(callback);
	}
	
	public fetchrating(company: string, callback: ((response: { rating: number }) => void))
	{
		this.http.post<{ rating: number }>("/company/fetch-rating", { company: company }).subscribe(callback);
	}
}
