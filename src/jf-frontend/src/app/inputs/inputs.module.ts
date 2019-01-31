import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputFileComponent } from "../inputs/input-file/input-file.component";

@NgModule
({
	declarations:
	[
		InputFileComponent
	],
	imports:
	[
		CommonModule
	],
	exports:
	[
		InputFileComponent
	]
})
export class InputsModule { }
