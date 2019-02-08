import mongoose from "mongoose";

let loc = new mongoose.Schema
({
	place: String,
	location: [{ name: String }]
});

export default mongoose.model("loc", loc);
