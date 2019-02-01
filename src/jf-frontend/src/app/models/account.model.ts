export interface IAccountInfo
{
	username: string,
	password: string,
	person:
	{
		firstname: string,
		lastname: string,
		phone: string,
		email: string,
		student:
		{
			year: number,
			graduated: boolean
		}
	},
	company:
	{
		name: string,
		address: string,
		director: string,
		cin: string,
		employees: number,
		email: string,
		web: string,
		sector: string,
		speciality: string
	}
}
