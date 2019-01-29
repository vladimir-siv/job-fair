import { OnInit, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";

export abstract class PopupFeed implements OnInit, AfterViewInit
{
	@ViewChild("header") private _header: TemplateRef<any>;
	@ViewChild("body") private _body: TemplateRef<any>;
	@ViewChild("footer") private _footer: TemplateRef<any>;
	@ViewChild("status") private _status: TemplateRef<any>;
	
	public get header(): TemplateRef<any> { return this._header; }
	public get body(): TemplateRef<any> { return this._body; }
	public get footer(): TemplateRef<any> { return this._footer; }
	public get status(): TemplateRef<any> { return this._status; }
	
	ngOnInit() { }
	ngAfterViewInit() { }
}
