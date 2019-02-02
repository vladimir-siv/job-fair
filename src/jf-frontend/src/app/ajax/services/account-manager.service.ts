import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "../ajax.types";
import { IAccountInfo } from "../../models/account.model";

@Injectable
({
	providedIn: "root"
})
export class AccountManagerService
{
	constructor
	(
		private router: Router,
		private http: HttpClient
	) { }
	
	public register(usertype: string, form: FormData, callback: ((response: IResponse) => void)): void
	{
		this.http.post<IResponse>("/account/register-" + usertype, form).subscribe(callback);
	}
	
	public login(username: string, password: string, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/account/login", { username: username, password: password }).subscribe(callback);
	}
	
	public changepassword(username: string, password: string, newpw: string, callback: ((response: IResponse) => void))
	{
		this.http.post<IResponse>("/account/password", { username: username, password: password, newpw: newpw }).subscribe(callback);
	}
	
	public accinfo(callback: ((response: { info: IAccountInfo }) => void))
	{
		this.http.get<{ info: IAccountInfo }>("/account/info").subscribe(callback);
	}
}
