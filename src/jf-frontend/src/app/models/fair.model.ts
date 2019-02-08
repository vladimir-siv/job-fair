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
	}[]
}
