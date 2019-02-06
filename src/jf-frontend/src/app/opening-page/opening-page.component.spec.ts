import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OpeningPageComponent } from "./opening-page.component";

describe("OpeningPageComponent", () =>
{
	let component: OpeningPageComponent;
	let fixture: ComponentFixture<OpeningPageComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [OpeningPageComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(OpeningPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
