import { Component, ViewChild } from "@angular/core";
import { PopupFeed } from "../PopupFeed";
import { InputFileComponent } from "../../inputs/input-file/input-file.component";
import { AccountManagerService } from "../../ajax/services/account-manager.service";

@Component
({
	selector: "register-popup-feed",
	templateUrl: "./register-popup-feed.component.html",
	styleUrls: ["./register-popup-feed.component.css"]
})
export class RegisterPopupFeedComponent extends PopupFeed
{
	public constructor
	(
		private account: AccountManagerService
	)
	{
		super();
	}
	
	private active: string = "student";
	
	// universal
	private username: string;
	private password: string;
	private pwconfirm: string;
	private email: string;
	
	// student
	private firstname: string = "";
	private lastname: string = "";
	private phone: string = "";
	private year: number = 0;
	private graduated: boolean = false;
	
	// company
	private name: string = "";
	private address: string = "";
	private director: string = "";
	private cin: string = "";
	private employees: number = 0;
	private web: string = "";
	private sector: string = "";
	private speciality: string = "";
	
	@ViewChild("attachment") private attachemnt: InputFileComponent;
	
	private prompts: { type: string, content: string }[];
	
	private register()
	{
		this.prompts = [];
		
		if (!this.username || this.username.search(/[^a-zA-Z0-9\.\_\-]/) != -1)
		{
			this.prompts.push({ type: "danger", content: "Username not valid." });
		}
		
		if (!this.password)
		{
			this.prompts.push({ type: "danger", content: "Password not valid." });
		}
		
		if (this.pwconfirm != this.password)
		{
			this.prompts.push({ type: "danger", content: "Password confirmation has to be the same as the password." });
		}
		
		if (!this.email)
		{
			this.prompts.push({ type: "danger", content: "E-Mail not valid." });
		}
		
		if (!this.attachemnt.files || this.attachemnt.files.length != 1)
		{
			this.prompts.push({ type: "danger", content: "Profile picture not present." });
		}
		
		if (this.prompts.length > 0) return;
		
		let form: FormData = new FormData();
		
		form.append("username", this.username);
		form.append("password", this.password);
		form.append("pwconfirm", this.pwconfirm);
		form.append("email", this.email);
		
		if (this.active == "student")
		{
			form.append("firstname", this.firstname);
			form.append("lastname", this.lastname);
			form.append("phone", this.phone);
			form.append("year", this.year + "");
			form.append("graduated", this.graduated + "");
		}
		else
		{
			form.append("name", this.name);
			form.append("address", this.address);
			form.append("director", this.director);
			form.append("cin", this.cin);
			form.append("employees", this.employees + "");
			form.append("web", this.web);
			form.append("sector", this.sector);
			form.append("speciality", this.speciality);
		}
		
		form.append("files[0]", this.attachemnt.files[0], this.attachemnt.files[0].name);
		
		this.account.register(this.active, form, response =>
		{
			this.prompts.push({ type: response.result, content: response.message });
		});
	}
}
