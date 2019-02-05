import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewOpeningPageComponent } from "./new-opening-page.component";

describe("NewOpeningPageComponent", () =>
{
	let component: NewOpeningPageComponent;
	let fixture: ComponentFixture<NewOpeningPageComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [NewOpeningPageComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(NewOpeningPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
