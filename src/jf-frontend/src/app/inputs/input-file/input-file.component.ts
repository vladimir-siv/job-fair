import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from "@angular/core";
import * as JQ from "jquery";

@Component
({
	selector: "input-file",
	templateUrl: "./input-file.component.html",
	styleUrls: ["./input-file.component.css"]
})
export class InputFileComponent implements OnInit, AfterViewInit
{
	@Input("accept") private accept: string = "";
	@Input("mode") private mode: string = "single";
	@Input("btn-class") private class: string = "";
	@Input("text") private text: string = "Attach file(s)...";
	@Input("prompt-files") private prompt: string = "true";
	
	@ViewChild("input") private _input: ElementRef | JQuery<HTMLElement>;
	private get input(): JQuery<HTMLElement> { return <JQuery<HTMLElement>>this._input; }
	private set input(value: JQuery<HTMLElement>) { this._input = value; }
	
	private _files: FileList;
	public get files(): FileList { return this._files; }
	
	private _fileNames: string[] = [];
	public get fileNames(): string[] { return this._fileNames; }
	
	ngOnInit()
	{
		
	}
	
	ngAfterViewInit()
	{
		this.input = JQ(<HTMLElement>(<ElementRef>this._input).nativeElement);
		
		if (this.mode.toLocaleLowerCase() == "multiple")
		{
			this.input.attr("multiple", "true");
		}
	}
	
	attach(): void
	{
		this.input.click();
	}
	
	onFilesSelected(files: FileList): void
	{
		this._files = files;
		
		//this._fileNames = JQ.map(this.input.prop("files"), val => val.name);
		this._fileNames = [];
		for (let i = 0; i < this._files.length; ++i)
			this._fileNames.push((<File>this._files.item(i)).name);
	}
}
