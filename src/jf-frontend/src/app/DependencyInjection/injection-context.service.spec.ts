import { TestBed } from "@angular/core/testing";

import { InjectionContext } from "./injection-context.service";

describe("InjectionContext", () =>
{
	beforeEach(() => TestBed.configureTestingModule({}));
	
	it("should be created", () =>
	{
		const service: InjectionContext = TestBed.get(InjectionContext);
		expect(service).toBeTruthy();
	});
});
