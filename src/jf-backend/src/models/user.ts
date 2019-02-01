import mongoose from "mongoose";

let user = new mongoose.Schema
({
	username: { type: String },
	password: { type: String },
	person:
	{
		firstname: { type: String },
		lastname: { type: String },
		phone: { type: String },
		email: { type: String },
		student:
		{
			year: { type: Number },
			graduated: { type: Boolean }
		}
	},
	company:
	{
		name: { type: String },
		address: { type: String },
		director: { type: String },
		cin: { type: String },
		employees: { type: Number },
		email: { type: String },
		web: { type: String },
		sector: { type: String },
		speciality: { type: String }
	}
});

export default mongoose.model("user", user);
