export class EventArgs
{
	private static _Empty: EventArgs = new EventArgs();
	public static get Empty(): EventArgs { return EventArgs.Empty; }
}
