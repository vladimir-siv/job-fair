import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CVEditPageComponent } from "./cvedit-page.component";

describe("CVEditPageComponent", () =>
{
	let component: CVEditPageComponent;
	let fixture: ComponentFixture<CVEditPageComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [CVEditPageComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(CVEditPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
