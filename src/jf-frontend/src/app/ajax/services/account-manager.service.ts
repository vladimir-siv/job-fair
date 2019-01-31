import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IResponse } from "../ajax.types";

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
	
	public register(files: FileList): void
	{
		if (files && files.length > 0)
		{
			let formData: FormData = new FormData();
			for (let i = 0; i < files.length; ++i)
				formData.append("files[" + i + "]", files[i], files[i].name);
			
			this.http.post<IResponse>("/dev/upload", formData).subscribe(response => console.log(response.message));
		}
	}
}
