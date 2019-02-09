export class FairInfo
{
	name: string = "";
	start: Date = new Date();
	end: Date = new Date();
	place: string = "";
	about: string = "";
	packages:
	{
		title: string;
		content: string[];
		videopromotion: number;
		nolessons: number;
		noworkshops: number;
		nopresentation: number;
		price: number;
		maxcompanies: number;
	}[] = [];
	additional:
	{
		title: string;
		price: number;
	}[] = [];
}

export interface IFairInfo
{
	name: string,
	start: Date,
	end: Date,
	place: string,
	about: string,
	packages:
	{
		title: string,
		content: string[],
		videopromotion: number,
		nolessons: number,
		noworkshops: number,
		nopresentation: number,
		price: number,
		maxcompanies: number
	}[],
	additional:
	{
		title: string,
		price: number
	}[],
	locations: { name: string }[],
	applications:
	{
		// @NotYetImplemented
		company: string
	}[]
}
