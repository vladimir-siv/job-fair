import express from "express";
import fs from "fs";
import path from "path";
import env from "../models/env";
import user from "../models/user";
import loc from "../models/loc";
import fair from "../models/fair";

let router = express.Router();

router.get("/env", (req, res, next) =>
{
	env.findOne({ active: true }, { active: 0 }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not find active environment");
			return next(err);
		}
		
		res.status(200).json({ env: data ? data : undefined });
	});
});

router.get("/users/:username", (req, res, next) =>
{
	user.findOne({ username: req.params.username }, { "company.openings.applications": 0 }, (err, data) =>
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
							let fpath = path.join("/storage/openings/", link, attachments[j]);
							if (fs.lstatSync(path.join(__dirname, "../../storage/users", link, attachments[j])).isFile())
								accinfo.company.openings[i].attachments.push(fpath.replace(/\\/g, "/"));
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

router.post("/jobs", (req, res, next) =>
{
	if (!req.body.name) req.body.name = "";
	if (!req.body.position) req.body.position = "";
	
	let query;
	
	if (req.body.job && req.body.internship)
	{
		query =
		{
			"company": { $exists: true },
			"company.name": new RegExp(req.body.name, "i"),
			"company.openings": { $exists: true },
			"company.openings.position": new RegExp(req.body.position, "i"),
			$or:
			[
				{ "company.openings.job": true },
				{ "company.openings.internship": true }
			]
		};
	}
	else
	{
		query =
		{
			"company": { $exists: true },
			"company.name": new RegExp(req.body.name, "i"),
			"company.openings": { $exists: true },
			"company.openings.position": new RegExp(req.body.position, "i"),
			"company.openings.job": true,
			"company.openings.internship": true
		};
		
		if (!req.body.job) delete query["company.openings.job"];
		if (!req.body.internship) delete query["company.openings.internship"];
	}
	
	let results:
	{
		companies: { username: string, name: string }[],
		openings: { username: string, index: number, position: string }[],
	} = { companies: [], openings: [] };
	
	user.find(query, { "username": 1, "company.name": 1, "company.openings": 1 }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not do the serach.");
			return next(err);
		}
		
		if (data)
		{
			// @ts-ignore
			results.companies = data.map(doc => ({ username: doc.username, name: doc.company.name }));
			
			for (let i = 0; i < data.length; ++i)
			{
				// @ts-ignore
				for (let j = 0; j < data[i].company.openings.length; ++j)
				{
					// @ts-ignore
					let opening = data[i].company.openings[j];
				
					if
					(
						opening.position.search(new RegExp(req.body.position, "i")) != -1
						&&
						(
							(req.body.job && opening.job)
							||
							(req.body.internship && opening.internship)
						)
					)
					{
						// @ts-ignore
						results.openings.push({ username: data[i].username, index: j, position: opening.position });
					}
				}
			}
		}
		
		res.status(200).json({ results: results });
	});
});

router.get("/current-fair", (req, res, next) =>
{
	fair.find({}).sort({ end: 'desc' }).limit(1).exec((err, data) =>
	{
		if (err)
		{
			console.log("Could not find last fair");
			return next(err);
		}
		
		if (!data || data.length == 0)
		{
			return res.status(200).json({ fair: undefined });
		}
		
		// @ts-ignore
		let lastStartTime = data[0].start.valueOf();
		let now = Date.now();
		
		if (now > lastStartTime)
		{
			return res.status(200).json({ fair: undefined });
		}
		
		// @ts-ignore
		loc.findOne({ place: data[0].place }, (err, locs) =>
		{
			if (err)
			{
				console.log("Could not find locations");
				next(err);
			}
			
			if (!locs)
			{
				return res.status(200).json({ fair: undefined });
			}
			
			let currFair = data[0].toJSON();
			
			// @ts-ignore
			currFair.locations = locs.location;
			
			res.status(200).json({ fair: currFair });
		});
	});
});

router.post("/apply-for-fair", (req, res, next) =>
{
	if
	(
		req.body.company == undefined
		||
		req.body.package == undefined
		||
		req.body.additional == undefined
	)
	{
		return res.status(200).json({ result: "danger", message: "Not all fields present." });
	}
	
	fair.find({}).sort({ end: 'desc' }).limit(1).exec((err, data) =>
	{
		if (err)
		{
			console.log("Could not find last fair");
			return next(err);
		}
		
		if (!data || data.length == 0)
		{
			return res.status(200).json({ result: "danger", message: "Could not apply for the fair. The fair may be unavailable at the current time." });
		}
		
		// @ts-ignore
		let lastStartTime = data[0].start.valueOf();
		let now = Date.now();
		
		if (now > lastStartTime)
		{
			return res.status(200).json({ result: "danger", message: "Could not apply for the fair. The fair may be unavailable at the current time." });
		}
		
		let currFair = data[0].toJSON();
		
		if (currFair.applications == undefined)
		{
			currFair.applications = [];
		}
		
		for (let i = 0; i < currFair.applications.length; ++i)
		{
			if (currFair.applications[i].company == req.body.company && currFair.applications[i].accepted != false)
			{
				return res.status(200).json({ result: "danger", message: "You already have an application to this fair." });
			}
		}
		
		currFair.applications.push
		({
			company: req.body.company,
			package: req.body.package,
			additional: req.body.additional,
			accepted: undefined,
			comment: "",
			events: []
		});
		
		data[0].update(currFair, (err, raw) =>
		{
			if (err)
			{
				console.log("Could not update fair");
				return next(err);
			}
			
			return res.status(200).json({ result: "success", message: "Successfully applied for the fair." });
		});
	});
});

export default router;
