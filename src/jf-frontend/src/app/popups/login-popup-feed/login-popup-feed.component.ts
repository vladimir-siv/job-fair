import { Component } from "@angular/core";
import { PopupFeed } from "../PopupFeed";

@Component
({
	selector: "login-popup-feed",
	templateUrl: "./login-popup-feed.component.html",
	styleUrls: ["./login-popup-feed.component.css"]
})
export class LoginPopupFeedComponent extends PopupFeed
{
	private email: string;
	private password: string;
	
	private login()
	{
		alert(this.email + " -> " + this.password);
	}
}
