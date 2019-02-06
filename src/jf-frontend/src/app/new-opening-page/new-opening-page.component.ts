import { Component, OnInit } from "@angular/core";
import { InjectionContext } from "../DependencyInjection/injection-context.service";
import { CompanyService } from "../ajax/services/company.service";

@Component
({
	selector: "new-opening-page",
	templateUrl: "./new-opening-page.component.html",
	styleUrls: ["./new-opening-page.component.css"]
})
export class NewOpeningPageComponent implements OnInit
{
	public constructor
	(
		private context: InjectionContext,
		private company: CompanyService
	) { }
	
	parse(date: string) { return new Date(date); }
	
	private job: boolean = true;
	private internship: boolean = false;
	private position: string;
	private description: string;
	private deadline: Date;
	
	private prompts: { type: string, content: string }[] = [];
	
	ngOnInit() { }
	
	open(files: FileList)
	{
		this.prompts = [];
		
		if (!this.position)
		{
			this.prompts.push({ type: "danger", content: "Position is empty." });
		}
		
		if (!this.description)
		{
			this.prompts.push({ type: "danger", content: "Description is empty." });
		}
		
		if (!this.deadline)
		{
			this.prompts.push({ type: "danger", content: "Deadline is not set." });
		}
		
		if (this.prompts.length > 0) return;
		
		let form: FormData = new FormData();
		
		form.append("job", this.job ? "true" : "false");
		form.append("internship", this.internship ? "true" : "false");
		form.append("position", this.position);
		form.append("description", this.description);
		form.append("deadline", this.deadline.toISOString());
		
		if (files)
			for (let i = 0; i < files.length; ++i)
				form.append("files[" + i + "]", files[i], files[i].name);
		
		this.company.publicize(form, response =>
		{
			this.context.app.showPromptAlert(response.result, response.message);
		});
	}
}
