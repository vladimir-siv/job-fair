import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FairApplicationDetailsPopupFeedComponent } from "./fair-application-details-popup-feed.component";

describe("FairApplicationDetailsPopupFeedComponent", () =>
{
	let component: FairApplicationDetailsPopupFeedComponent;
	let fixture: ComponentFixture<FairApplicationDetailsPopupFeedComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [FairApplicationDetailsPopupFeedComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(FairApplicationDetailsPopupFeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
