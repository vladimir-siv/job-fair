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

router.post("/companies", (req, res, next) =>
{
	if (!req.body.name) req.body.name = "";
	if (!req.body.address) req.body.address = "";
	if (!req.body.sectors) return res.status(200).json({ results: [] });
	
	user.find({ "company.name": new RegExp(req.body.name, "i"), "company.address": new RegExp(req.body.address, "i"), "company.sector": { $in: req.body.sectors } }, { "username": 1, "company.name": 1 }, (err, data) =>
	{
		if (err)
		{
			console.log("Error in executing the query.");
			return next(err);
		}
		
		// @ts-ignore
		res.status(200).json({ results: data.map(doc => ({ username: doc.username, name: doc.company.name })) });
	});
});

export default router;
