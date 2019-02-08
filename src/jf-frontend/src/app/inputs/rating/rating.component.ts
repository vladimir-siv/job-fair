import { Component, OnInit, Input } from "@angular/core";

@Component
({
	selector: "rating",
	templateUrl: "./rating.component.html",
	styleUrls: ["./rating.component.css"]
})
export class RatingComponent implements OnInit
{
	@Input("mode") public mode: string = "sensitive";
	
	@Input("value") private _value: number = 0;
	public get value(): number
	{
		return this._value;
	}
	public set value(value: number)
	{
		this._value = value;
		this.update();
	}
	
	private stars: string[] = [];
	
	ngOnInit()
	{
		this.update();
	}
	
	update()
	{
		let stars: string[] = [];
		
		for (let i = 0; i < 10; ++i)
		{
			if (i < this.value && this.value < i + 1)
			{
				stars.push("fa-star-half-o");
				continue;
			}
			
			if (i < this.value) stars.push("fa-star");
			else stars.push("fa-star-o");
		}
		
		this.stars = stars;
	}
	
	clickset(value: number)
	{
		if (this.mode.toLocaleLowerCase() == "insensitive") return;
		this.value = value;
	}
}
