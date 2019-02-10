import { Component, Input } from "@angular/core";
import { PopupFeed } from "../PopupFeed";

@Component
({
	selector: "comment-popup-feed",
	templateUrl: "./comment-popup-feed.component.html",
	styleUrls: ["./comment-popup-feed.component.css"]
})
export class CommentPopupFeedComponent extends PopupFeed
{
	@Input("callback") private callback: ((comment: string) => void);
	private comment: string = "";
}
