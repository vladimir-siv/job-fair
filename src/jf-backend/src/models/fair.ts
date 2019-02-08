import mongoose from "mongoose";

let fair = new mongoose.Schema
({
	name: String,
	start: Date,
	end: Date,
	place: String,
	about: String,
	packages:
	{
		type:
		[{
			title: String,
			content: [String],
			videopromotion: Number,
			nolessons: Number,
			noworkshops: Number,
			nopresentation: Number,
			price: Number,
			maxcompanies: Number
		}],
		default: undefined
	},
	additional:
	{
		type:
		[{
			title: String,
			price: Number
		}],
		default: undefined
	}
});

export default mongoose.model("fair", fair);