let specialchars = ['#', '*', '.', '!', '?', '#'];
let imageTypes = [".png", ".jpg"]

export default
{
	validateImgType(filename: string): boolean
	{
		for (let i = 0; i < imageTypes.length; ++i)
		{
			if (filename.endsWith(imageTypes[i])) return true;
		}
		
		return false;
	},
	
	contains(haystack: any[], needle: any): boolean
	{
		for (let i = 0; i < haystack.length; ++i)
		{
			if (haystack[i] == needle) return true;
		}
		
		return false;
	},
	
	checkusername(username: string): string
	{
		if (username.length <= 0) return "Username cannot be empty.";
		
		for (let i = 0; i < username.length; ++i)
		{
			if
			(
				'A' <= username[i] && username[i] <= 'Z'
				||
				'a' <= username[i] && username[i] <= 'z'
				||
				'0' <= username[i] && username[i] <= '9'
				||
				username[i] == '_' || username[i] == '-' || username[i] == '.'
			) continue;
			
			return "Username must only contain letters, numbers and [_, -, .]."
		}
		
		return "";
	},
	
	checkpassword(password: string, pwconfirm: string): string
	{
		if (password.length < 8 || 12 < password.length) return "Password length has to be between 8 and 12 characters.";
		
		let capitals: number = 0;		// min 1
		let noncapitals: number = 0;	// min 3
		let digits: number = 0;			// min 1
		let specials: number = 0;		// min 1
		let first = ('A' <= password[0] && password[0] <= 'Z') || ('a' <= password[0] && password[0] <= 'z')
		let consequent = false;			// must be false
		
		for (let i = 0; i < password.length; ++i)
		{
			if ('A' <= password[i] && password[i] <= 'Z') ++capitals;
			if ('a' <= password[i] && password[i] <= 'z') ++noncapitals;
			if ('0' <= password[i] && password[i] <= '9') ++digits;
			if (this.contains(specialchars, password[i])) ++specials;
			
			if (i < password.length - 1)
			{
				if (password[i] == password[i + 1]) consequent = true;
			}
		}
		
		if (password != pwconfirm) return "Password and password confirmation do not match.";
		if (capitals < 1) return "Password has to have at least 1 uppercase letter.";
		if (noncapitals < 3) return "Password has to have at least 3 lowercase letters.";
		if (digits < 1) return "Password has to have at least 1 digit.";
		if (specials < 1) return "Password has to have at least one special character [" + specialchars.join(", ") + "]";
		if (!first) return "First character of the password has to be a letter (lowercase or uppercase).";
		if (consequent) return "No two consequent characters can be the same.";
		
		return "";
	},
	
	parseCV(json: string): any
	{
		let cv = JSON.parse(json);
		
		cv.birth = new Date(cv.birth);
		
		for (let i = 0; i < cv.work.length; ++i)
		{
			cv.work[i].from = new Date(cv.work[i].from);
			cv.work[i].to = new Date(cv.work[i].to);
		}
		
		for (let i = 0; i < cv.education.length; ++i)
		{
			cv.education[i].from = new Date(cv.education[i].from);
			cv.education[i].to = new Date(cv.education[i].to);
		}
		
		return cv;
	},
	
	parseDate(datetime: string): Date
	{
		datetime = datetime.substring(0, datetime.length - 1);
		let dt = datetime.split('T');
		let date = new Date(dt[0]);
		
		let time = dt[1].split(':');
		date.setHours(parseInt(time[0]));
		date.setMinutes(parseInt(time[1]));
		
		let sm = time[2].split('.');
		date.setSeconds(parseInt(sm[0]));
		date.setMilliseconds(parseInt(sm[1]));
		
		return date;
	},
	
	checkclash(e1: { eventtype: string, location: string, start: Date, end: Date }, e2: { eventtype: string, location: string, start: Date, end: Date }): boolean
	{
		if
		(
			e1.start.valueOf() < e2.end.valueOf()
			&&
			e1.end.valueOf() > e2.start.valueOf()
		) return true;
		
		return false;
	},
	
	validevent(fair: any, event: { eventtype: string, location: string, start: Date, end: Date }): boolean
	{
		if (event.start.valueOf() >= event.end.valueOf()) return false;
		
		if
		(
			event.start.valueOf() < fair.start.valueOf()
			||
			event.end.valueOf() > fair.end.valueOf()
		) return false;
		
		for (let i = 0; i < fair.applications.length; ++i)
		{
			if (fair.applications[i].accepted)
			{
				for (let j = 0; j < fair.applications[i].events.length; ++j)
				{
					if (fair.applications[i].events[j].location == event.location)
					{
						if (this.checkclash(event, fair.applications[i].events[j])) return false;
					}
				}
			}
		}
		
		return true;
	}
}
