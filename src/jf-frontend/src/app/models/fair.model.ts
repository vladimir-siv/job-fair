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
