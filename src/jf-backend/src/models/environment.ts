import mongoose from "mongoose";

let environment = new mongoose.Schema
({
	active: { type: Boolean, default: false },
	cv: { type: Boolean, default: false }
});

export default mongoose.model("environment", environment);
