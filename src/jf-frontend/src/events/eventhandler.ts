import { Action, IGenericDelegate } from 'src/delegates/delegate';
import { EventArgs } from './eventargs';

export class EventHandler<T extends EventArgs> implements IGenericDelegate
{
	private handler: Action<[any, T]>;
	
	constructor(callback: ((arg: [any, T]) => void), thisArg: any = null)
	{
		this.handler = new Action<[any, T]>(callback, thisArg);
	}
	
	public invoke(arg: [any, T]): void
	{
		this.handler.invoke(arg);
	}
}
