import mongoose from "mongoose";

let env = new mongoose.Schema
({
	active: { type: Boolean, default: false },
	cv: { type: Boolean, default: false },
	fair: { type: Boolean, default: false }
});

export default mongoose.model("env", env);
