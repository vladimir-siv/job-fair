import { EventHandler } from './eventhandler';
import { EventArgs } from './eventargs';

export class Event<T extends EventArgs>
{
	private callbacks: EventHandler<T>[] = [];
	
	public reg(callback: EventHandler<T>): void
	{
		this.callbacks.push(callback);
	}
	
	public unreg(callback: EventHandler<T>): void
	{
		var index = this.callbacks.lastIndexOf(callback);
		if (index >= 0) this.callbacks.splice(index, 1);
	}
	
	public clear(): void
	{
		this.callbacks = [];
	}
	
	public fire(sender: any, e: T): void
	{
		for (var i = 0; i < this.callbacks.length; ++i)
		{
			this.callbacks[i].invoke([sender, e]);
		}
	}
}
