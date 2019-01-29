import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginPopupFeedComponent } from "./login-popup-feed.component";

describe("LoginPopupFeedComponent", () =>
{
	let component: LoginPopupFeedComponent;
	let fixture: ComponentFixture<LoginPopupFeedComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [LoginPopupFeedComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(LoginPopupFeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
