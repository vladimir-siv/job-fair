import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { PopupFeed } from "../PopupFeed";
import { ModalDirective } from "ngx-bootstrap";

@Component
({
	selector: "popup",
	templateUrl: "./popup.component.html",
	styleUrls: ["./popup.component.css"]
})
export class PopupComponent implements OnInit, AfterViewInit
{
	@ViewChild("this") private popup: ModalDirective;
	
	public feed: PopupFeed;
	
	ngOnInit() { }
	ngAfterViewInit() { }
	
	public show(): void { this.popup.show(); }
	public hide(): void { this.popup.hide(); }
	public toggle(): void { this.popup.toggle(); }
}
