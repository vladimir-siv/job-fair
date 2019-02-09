import { OnInit, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";

export abstract class PopupFeed implements OnInit, AfterViewInit
{
	@ViewChild("header") private _header: TemplateRef<any>;
	public get header(): TemplateRef<any> { return this._header; }
	
	@ViewChild("body") private _body: TemplateRef<any>;
	public get body(): TemplateRef<any> { return this._body; }
	
	@ViewChild("footer") private _footer: TemplateRef<any>;
	public get footer(): TemplateRef<any> { return this._footer; }
	
	@ViewChild("status") private _status: TemplateRef<any>;
	public get status(): TemplateRef<any> { return this._status; }
	
	ngOnInit() { }
	ngAfterViewInit() { }
	
	public onShow() { }
	public onHide() { }
	public onToggle() { }
}
