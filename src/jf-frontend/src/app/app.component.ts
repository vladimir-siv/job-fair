import { Component, AfterViewInit } from "@angular/core";
import * as JQ from "jquery";

@Component
({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit
{
	win: JQuery<Window> = JQ(window);
	doc: JQuery<Document> = JQ(document);
	body: JQuery<HTMLElement> = JQ();
	
	fixed: JQuery<HTMLElement> = JQ();
	wrapper: JQuery<HTMLElement> = JQ();
	header: JQuery<HTMLElement> = JQ();
	navbar: JQuery<HTMLElement> = JQ();
	content: JQuery<HTMLElement> = JQ();
	footer: JQuery<HTMLElement> = JQ();
	
	ngAfterViewInit()
	{
		this.body = JQ(document.body);
		this.fixed = this.body.find("div#wrapper > div#top-content-fixed > header#header-fixed");
		this.wrapper = this.body.find("div#wrapper");
		this.header = this.body.find("div#wrapper > header#header-main");
		this.navbar = this.body.find("div#wrapper > nav#navbar-main");
		this.content = this.body.find("div#wrapper > div#content");
		this.footer = this.body.find("div#wrapper > footer#footer-main");
		
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
			this.content[0].style.height =
			(
				this.wrapper[0].getIntProp("height") -
				(
					this.header[0].getIntProp("height")
					+
					this.navbar[0].getIntProp("height")
					+
					this.footer[0].getIntProp("height")
				)
			) + "px";
		}
	}
	
	onWindowScroll()
	{
		if (<number>this.win.scrollTop() > this.header[0].getIntProp("height") + this.navbar[0].getIntProp("height"))
		{
			if (!this.fixed.hasClass("on-top")) this.fixed.addClass("on-top");
		}
		else if (this.fixed.hasClass("on-top")) this.fixed.removeClass("on-top");
	}
}
