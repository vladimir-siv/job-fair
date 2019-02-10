import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventDetailsPopupFeedComponent } from "./event-details-popup-feed.component";

describe("EventDetailsPopupFeedComponent", () =>
{
	let component: EventDetailsPopupFeedComponent;
	let fixture: ComponentFixture<EventDetailsPopupFeedComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [EventDetailsPopupFeedComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(EventDetailsPopupFeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
