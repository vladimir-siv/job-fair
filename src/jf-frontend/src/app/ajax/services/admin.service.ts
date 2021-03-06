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
	
	public fair(enabled: boolean, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/admin/update-fair", { fair: enabled }).subscribe(callback);
	}
	
	public locations(callback: ((response: { locations: { place: string }[] }) => void))
	{
		this.http.get<{ locations: { place: string }[] }>("/admin/fair-locations").subscribe(callback);
	}
	
	public createfair(form: FormData, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/admin/create-fair", form).subscribe(callback);
	}
	
	public updatemaxcompanies(packageno: number, maxcompanies: number, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/admin/update-maxcompanies", { packageno: packageno, maxcompanies: maxcompanies }).subscribe(callback);
	}
	
	public acceptapplication(application: number, events: { eventtype: string, location: string, start: Date, end: Date }[], callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/admin/accept-application", { application: application, events: events }).subscribe(callback);
	}
	
	public rejectapplication(application: number, comment: string, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/admin/reject-application", { application: application, comment: comment }).subscribe(callback);
	}
	
	public updateevent(application: number, index: number, data: { eventtype: string, location: string, start: Date, end: Date }, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/admin/update-event", { application: application, index: index, data: data }).subscribe(callback);
	}
}
