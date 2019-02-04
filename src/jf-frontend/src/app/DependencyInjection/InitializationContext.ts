export class InitializationContext<T>
{
	private _value: T;
	private listeners: ((value: T) => void)[] = [];
	
	public fetch(callback: ((value: T) => void)): void
	{
		if (this._value) callback(this._value);
		else this.listeners.push(callback);
	}
	
	public set value(value: T)
	{
		if (this._value) return;
		this._value = value;
		
		for (let i = 0; i < this.listeners.length; ++i)
		{
			this.listeners[i](value);
		}
		
		this.listeners = [];
	}
}
