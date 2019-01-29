import { AppComponent } from '../app.component';

export class DependencyInjectionContext
{
	private static initialized: boolean = false;
	
	private static _app: AppComponent;
	public static get app(): AppComponent { return DependencyInjectionContext._app; }
	
	public static init(app: AppComponent): void
	{
		if (DependencyInjectionContext.initialized) return;
		
		DependencyInjectionContext._app = app;
		
		DependencyInjectionContext.initialized = true;
	}
}
