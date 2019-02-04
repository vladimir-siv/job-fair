import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { DevService } from "../ajax/services/dev.service";

@Component
({
	selector: "home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private dev: DevService
	) { }
	
	ngOnInit() { }
	
	upload(files: FileList)
	{
		this.dev.upload("/dev/upload", files, response =>
		{
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
}
