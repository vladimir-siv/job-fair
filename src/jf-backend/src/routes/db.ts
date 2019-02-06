import express from "express";
import fs from "fs";
import path from "path";
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
			let accinfo: any = data.toJSON();
			
			accinfo.password = "";
			
			if (accinfo.person && accinfo.person.student && accinfo.person.student.cv)
			{
				accinfo.person.student.cv = undefined;
			}
			
			if (accinfo.company && accinfo.company.openings)
			{
				if (req.session && req.session.user)
				{
					for (let i = 0; i < accinfo.company.openings.length; ++i)
					{
						accinfo.company.openings[i].attachments = [];
						
						let link = path.join(accinfo.username, accinfo.company.openings[i].position + "-" + accinfo.company.openings[i].started.valueOf());
						
						let attachments = fs.readdirSync(path.join(__dirname, "../../storage/users/", link));
						
						for (let j = 0; j < attachments.length; ++j)
						{
							accinfo.company.openings[i].attachments.push(path.join("/storage/openings/", link, attachments[j]).replace(/\\/g, "/"));
						}
					}
				}
				else accinfo.company.openings = undefined;
			}
			
			if (req.session && req.session.user || accinfo.company)
			{
				return res.status(200).json({ info: accinfo });
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
