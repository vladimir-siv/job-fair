import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { InjectionContext } from "./DependencyInjection/injection-context.service";
import { InitializationContext } from "./DependencyInjection/InitializationContext";
import { PopupComponent } from "./popups/popup/popup.component";
import { AlertComponent } from "./popups/alert/alert.component";
import { PopupFeed } from "./popups/PopupFeed";
import { AlertFeed } from "./popups/AlertFeed";
import { PromptAlertFeedComponent } from "./popups/prompt-alert-feed/prompt-alert-feed.component";
import { AccountManagerService } from "./ajax/services/account-manager.service";
import { IAccountInfo } from "./models/account.model";
import * as JQ from "jquery";

@Component
({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit
{
	public constructor
	(
		private context: InjectionContext,
		private account: AccountManagerService
	)
	{
		context.app = this;
		this.account.accinfo(response => this.setaccinfo(response.info));
	}
	
	private _accinfo: IAccountInfo;
	
	private _accinfoinit: InitializationContext<IAccountInfo> = new InitializationContext<IAccountInfo>();
	public get accinfo(): InitializationContext<IAccountInfo> { return this._accinfoinit; }
	private setaccinfo(value: IAccountInfo) { if (!this._accinfo) this._accinfoinit.value = this._accinfo = value; }
	
	@ViewChild("popup") private popup: PopupComponent;
	@ViewChild("alert") private alert: AlertComponent;
	@ViewChild("prompt") private prompt: PromptAlertFeedComponent;
	
	private win: JQuery<Window> = JQ(window);
	public get window(): JQuery<Window> { return this.win; }
	private doc: JQuery<Document> = JQ(document);
	public get document(): JQuery<Document> { return this.doc; }
	
	private _body: JQuery<HTMLElement>;
	public get body(): JQuery<HTMLElement> { return this._body; }
	private _fixed: JQuery<HTMLElement>;
	public get fixed(): JQuery<HTMLElement> { return this._fixed; }
	private _wrapper: JQuery<HTMLElement>;
	public get wrapper(): JQuery<HTMLElement> { return this._wrapper; }
	private _header: JQuery<HTMLElement>;
	public get header(): JQuery<HTMLElement> { return this._header; }
	private _navbar: JQuery<HTMLElement>;
	public get navbar(): JQuery<HTMLElement> { return this._navbar; }
	private _content: JQuery<HTMLElement>;
	public get content(): JQuery<HTMLElement> { return this._content; }
	private _footer: JQuery<HTMLElement>;
	public get footer(): JQuery<HTMLElement> { return this._footer; }
	
	ngAfterViewInit()
	{
		this._body = JQ(document.body);
		this._fixed = this._body.find("div#wrapper > div#top-content-fixed > header#header-fixed");
		this._wrapper = this._body.find("div#wrapper");
		this._header = this._body.find("div#wrapper > header#header-main");
		this._navbar = this._body.find("div#wrapper > nav#navbar-main");
		this._content = this._body.find("div#wrapper > div#content");
		this._footer = this._body.find("div#wrapper > footer#footer-main");
		
		this.win.on("resize", e => this.onWindowResize());
		this.win.on("scroll", e => this.onWindowScroll());
		
		this.onWindowResize();
		this.onWindowScroll();
	}
	
	onWindowResize()
	{
		let docElement = (<HTMLElement>document.documentElement);
		
		if (docElement.scrollHeight <= docElement.clientHeight)
		{
			//this._content[0].style.height =
			this._content[0].style.minHeight =
			(
				this._wrapper[0].getIntProp("height") -
				(
					this._header[0].getIntProp("height")
					+
					this._navbar[0].getIntProp("height")
					+
					this._footer[0].getIntProp("height")
				)
			) + "px";
		}
	}
	
	onWindowScroll()
	{
		if (<number>this.win.scrollTop() > this._header[0].getIntProp("height") + this._navbar[0].getIntProp("height"))
		{
			if (!this._fixed.hasClass("on-top")) this._fixed.addClass("on-top");
		}
		else if (this._fixed.hasClass("on-top")) this._fixed.removeClass("on-top");
	}
	
	public showPopup(feed: PopupFeed)
	{
		this.popup.feed = feed;
		this.popup.show();
	}
	
	public hidePopup()
	{
		this.popup.hide();
	}
	
	public showAlert(feed: AlertFeed)
	{
		this.alert.feed = feed;
		this.alert.show();
	}
	
	public showPromptAlert(type: string, content: string, heading: string = "", dismissable: boolean = true)
	{
		this.showAlert(this.prompt.create(type, content, heading, dismissable));
	}
	
	public hideAlert()
	{
		this.alert.hide();
	}
}
