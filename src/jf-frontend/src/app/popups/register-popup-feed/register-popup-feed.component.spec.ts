import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterPopupFeedComponent } from "./register-popup-feed.component";

describe("RegisterPopupFeedComponent", () =>
{
	let component: RegisterPopupFeedComponent;
	let fixture: ComponentFixture<RegisterPopupFeedComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [RegisterPopupFeedComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(RegisterPopupFeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
