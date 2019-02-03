import express from "express";
import user from "../models/user";

let router = express.Router();

router.get("/users/:username", (req, res, next) =>
{
	user.findOne({ username: req.params.username }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not find username \"" + req.params.username + "\"");
			return next(err);
		}
		
		if (data)
		{
			// @ts-ignore
			data.password = "";
			
			// @ts-ignore
			if (req.session.user || data.company.name)
			{
				return res.status(200).json({ info: data });
			}
		}
		
		res.status(200).json({ info: { username: "@INVALID" } });
	});
});

export default router;
