import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CommentPopupFeedComponent } from "./comment-popup-feed.component";

describe("CommentPopupFeedComponent", () =>
{
	let component: CommentPopupFeedComponent;
	let fixture: ComponentFixture<CommentPopupFeedComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule
		({
			declarations: [CommentPopupFeedComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(CommentPopupFeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () =>
	{
		expect(component).toBeTruthy();
	});
});
