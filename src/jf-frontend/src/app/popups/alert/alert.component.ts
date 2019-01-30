import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { AlertFeed } from "../AlertFeed";
import { ModalDirective } from "ngx-bootstrap";

@Component
({
	selector: "alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit, AfterViewInit
{
	@ViewChild("this") private alert: ModalDirective
	
	public feed: AlertFeed;
	
	ngOnInit() { }
	ngAfterViewInit() { }
	
	public show(): void { this.alert.show(); }
	public hide(): void { this.alert.hide(); }
	public toggle(): void { this.alert.toggle(); }
}
