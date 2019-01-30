import { OnInit, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";

export abstract class AlertFeed implements OnInit, AfterViewInit
{
	@ViewChild("body") private _body: TemplateRef<any>;
	public get body(): TemplateRef<any> { return this._body; }
	
	ngOnInit() { }
	ngAfterViewInit() { }
}
