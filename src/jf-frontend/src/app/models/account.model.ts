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
			graduated: boolean,
			cv: any
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
		speciality: string,
		openings:
		{
			started: Date,
			job: boolean,
			internship: boolean,
			position: string,
			description: string,
			deadline: Date
			attachments: string[],
			applications:
			[{
				on: Date,
				username: string,
				cv: any,
				textcover: string,
				filecover: string
			}]
		}[]
	}
}
