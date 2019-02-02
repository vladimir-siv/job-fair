import { Component, OnInit } from "@angular/core";
import { AccountManagerService } from "../ajax/services/account-manager.service";

@Component
({
	selector: "index-page",
	templateUrl: "./index-page.component.html",
	styleUrls: ["./index-page.component.css"]
})
export class IndexPageComponent implements OnInit
{
	public constructor
	(
		private account: AccountManagerService
	) { }
	
	ngOnInit() { }
	
	private username: string = "";
	private password: string = "";
	private newpw: string = "";
	
	private prompts: { type: string, content: string }[] = [];
	
	changepass()
	{
		this.prompts = [];
		
		if (!this.username)
		{
			this.prompts.push({ type: "danger", content: "Invalid username!" });
		}
		
		if (!this.password)
		{
			this.prompts.push({ type: "danger", content: "Invalid password!" });
		}
		
		if (!this.newpw)
		{
			this.prompts.push({ type: "danger", content: "Invalid new password!" });
		}
		
		if (this.prompts.length > 0) return;
		
		this.account.changepassword(this.username, this.password, this.newpw, response =>
		{
			this.prompts.push({ type: response.result, content: response.message });
		});
	}
}
