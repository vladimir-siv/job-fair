export interface IDelegate { invoke(): any; }
export interface IGenericDelegate { invoke(arg: any): any; }

export class Executable implements IDelegate
{
	public constructor
	(
		private callback: (() => void),
		private thisArg: any = null
	) { }
	
	public invoke(): void { Reflect.apply(this.callback, this.thisArg, []); }
}

export class Generator<TOUT> implements IDelegate
{
	public constructor
	(
		private callback: (() => void),
		private thisArg: any = null
	) { }
	
	public invoke(): TOUT { return Reflect.apply(this.callback, this.thisArg, []); }
}

export class Action<TARG = any> implements IGenericDelegate
{
	public constructor
	(
		private callback: ((arg: TARG) => void),
		private thisArg: any = null
	) { }
	
	public invoke(arg: TARG): void { Reflect.apply(this.callback, this.thisArg, [arg]); }
}

export class Func<TOUT, TARG = any> implements IGenericDelegate
{
	public constructor
	(
		private callback: ((arg: TARG) => TOUT),
		private thisArg: any = null
	) { }
	
	public invoke(arg: TARG): TOUT { return Reflect.apply(this.callback, this.thisArg, [arg]); }
}
