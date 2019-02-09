import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FairApplicationPageComponent } from "./fair-application-page.component";

describe("FairApplicationPageComponent", () =>
{
	let component: FairApplicationPageComponent;
	let fixture: ComponentFixture<FairApplicationPageComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [FairApplicationPageComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(FairApplicationPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
