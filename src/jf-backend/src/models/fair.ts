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
	},
	// locations are optionally embedded (check GET/db/current-fair)
	applications:
	{
		type:
		[{
			company: String,
			package: Number,
			additional: [Number],
			accepted: Boolean,
			comment: String,
			events:
			{
				type:
				[{
					eventtype: String,
					location: String,
					start: Date,
					end: Date
				}],
				default: []
			}
		}],
		default: []
	}
});

export default mongoose.model("fair", fair);
