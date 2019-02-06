import mongoose from "mongoose";

let user = new mongoose.Schema
({
	username: String,
	password: String,
	person:
	{
		firstname: String,
		lastname: String,
		phone: String,
		email: String,
		student:
		{
			year: Number,
			graduated: Boolean,
			cv: Object
		}
	},
	company:
	{
		name: String,
		address: String,
		director: String,
		cin: String,
		employees: Number,
		email: String,
		web: String,
		sector: String,
		speciality: String,
		openings:
		[{
			started: { type: Date, default: Date.now },
			job: Boolean,
			internship: Boolean,
			position: String,
			description: String,
			deadline: Date
		}]
	}
});

export default mongoose.model("user", user);
