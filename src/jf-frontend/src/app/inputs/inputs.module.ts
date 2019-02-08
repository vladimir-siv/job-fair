import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputFileComponent } from "../inputs/input-file/input-file.component";
import { RatingComponent } from "../inputs/rating/rating.component";

@NgModule
({
	declarations:
	[
		InputFileComponent,
		RatingComponent
	],
	imports:
	[
		CommonModule
	],
	exports:
	[
		InputFileComponent,
		RatingComponent
	]
})
export class InputsModule { }
