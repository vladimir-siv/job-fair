import { Component, Input } from "@angular/core";
import { PopupFeed } from "../PopupFeed";

@Component
({
	selector: "event-details-popup-feed",
	templateUrl: "./event-details-popup-feed.component.html",
	styleUrls: ["./event-details-popup-feed.component.css"]
})
export class EventDetailsPopupFeedComponent extends PopupFeed
{
	@Input("callback") private callback: (() => void);
	public event:
	{
		application: number,
		index: number,
		locations: { name: string }[],
		data:
		{
			eventtype: string,
			location: string,
			start: Date,
			end: Date
		}
	};
}
