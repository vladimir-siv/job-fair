import { Component } from "@angular/core";
import { PopupFeed } from "../PopupFeed";
import { AccountManagerService } from "../../ajax/services/account-manager.service";

@Component
({
	selector: "login-popup-feed",
	templateUrl: "./login-popup-feed.component.html",
	styleUrls: ["./login-popup-feed.component.css"]
})
export class LoginPopupFeedComponent extends PopupFeed
{
	public constructor
	(
		private account: AccountManagerService
	)
	{
		super();
	}
	
	private username: string;
	private password: string;
	
	private prompts: { type: string, content: string }[];
	
	private login()
	{
		this.prompts = [];
		
		if (!this.username || this.username.search(/[^a-zA-Z0-9\.\_\-]/) != -1)
		{
			this.prompts.push({ type: "danger", content: "Username not valid." });
		}
		
		if (!this.password)
		{
			this.prompts.push({ type: "danger", content: "Password not valid." });
		}
		
		if (this.prompts.length > 0) return;
		
		this.account.login(this.username, this.password, response =>
		{
			this.prompts.push({ type: response.result, content: response.message });
			
			if (response.result == "success")
			{
				window.location.replace("/home");
			}
		});
	}
}
