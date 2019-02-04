import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "../ajax.types";

@Injectable
({
	providedIn: "root"
})
export class DevService
{
	public constructor
	(
		private http: HttpClient
	) { }
	
	public upload(url: string, files: FileList, callback: ((response: IResponse) => void))
	{
		let form: FormData = new FormData();
		for (let i = 0; i < files.length; ++i)
			form.append("files[" + i + "]", files[i], files[i].name);
		
		this.http.post<IResponse>(url, form).subscribe(callback);
	}
}
