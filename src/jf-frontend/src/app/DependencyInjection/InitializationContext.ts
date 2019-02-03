export class InitializationContext<T>
{	
	private listeners: ((value: T) => void)[] = [];
	public subscribe(callback: ((value: T) => void)): void { this.listeners.push(callback); }
	public set value(value: T) { for (let i = 0; i < this.listeners.length; ++i) this.listeners[i](value); }
}
