import { Component } from "@angular/core";
import { AlertFeed } from "../AlertFeed";

@Component
({
	selector: "prompt-alert-feed",
	templateUrl: "./prompt-alert-feed.component.html",
	styleUrls: ["./prompt-alert-feed.component.css"]
})
export class PromptAlertFeedComponent extends AlertFeed
{
	public type: string;
	public content: string;
	public heading: string;
	public dismissable: boolean;
	
	public create(type: string, content: string, heading: string = "", dismissable: boolean = true): PromptAlertFeedComponent
	{
		this.type = type;
		this.content = content;
		this.heading = heading;
		this.dismissable = dismissable;
		
		return this;
	}
}
