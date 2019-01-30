import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PromptAlertFeedComponent } from "./prompt-alert-feed.component";

describe("PromptAlertFeedComponent", () =>
{
	let component: PromptAlertFeedComponent;
	let fixture: ComponentFixture<PromptAlertFeedComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [PromptAlertFeedComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(PromptAlertFeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
