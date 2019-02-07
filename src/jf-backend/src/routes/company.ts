import express from "express";
import fileupload from "express-fileupload";
import fs from "fs";
import path from "path";
import user from "../models/user";
import sharedlib from "../shared/library";

let router = express.Router();

router.post("/new-opening", (req, res, next) =>
{
	if (!req.session || !req.session.user || !req.session.user.company)
	{
		return res.status(200).json({ result: "danger", message: "Could not publicize new opening." });
	}
	
	if
	(
		!req.body.position
		||
		!req.body.description
		||
		!req.body.deadline
	)
	{
		return res.status(200).json({ result: "danger", message: "Not all fields present." });
	}
	
	user.findOne({ username: req.session.user.username }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not fine user");
			return next(err);
		}
		
		let now = Date.now();
		
		// @ts-ignore
		if (!data.company.openings)
		{
			// @ts-ignore
			data.company.openings = [];
		}
		
		// @ts-ignore
		data.company.openings.push
		({
			started: new Date(now),
			job: req.body.job.toLocaleLowerCase() == "true",
			internship: req.body.internship.toLocaleLowerCase() == "true",
			position: req.body.position,
			description: req.body.description,
			deadline: req.body.deadline
		});
		
		// @ts-ignore
		user.updateOne({ username: req.session.user.username }, data, async (err, raw) =>
		{
			if (err)
			{
				console.log("Could not update new opening");
				return next(err);
			}
			
			// @ts-ignore
			let dir = path.join(__dirname, "../../storage/users/", req.session.user.username, req.body.position + "-" + now);
			fs.mkdirSync(dir);
			
			if (req.files)
			{
				let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
				
				if (uploads.files)
				{
					for (let i = 0; i < uploads.files.length; ++i)
					{
						if (uploads.files[i].name.endsWith(".pdf"))
						{
							// @ts-ignore
							await uploads.files[i].mv(path.join(dir, uploads.files[i].name));
						}
					}
				}
			}
			
			// @ts-ignore
			req.session.user.company.openings = data.company.openings;
			res.status(200).json({ result: "success", message: "Successfully publicized new opening!" });
		});
	});
});

router.post("/apply", (req, res, next) =>
{
	if (!req.session || !req.session.user || !req.session.user.person || !req.session.user.person.student)
	{
		return res.status(200).json({ result: "danger", message: "Could not apply for position." });
	}
	
	if
	(
		!req.body.company
		||
		!req.body.opening
		||
		!req.body.username
		||
		!req.body.cv
	)
	{
		return res.status(200).json({ result: "danger", message: "Not all fields present." });
	}
	
	req.body.opening = parseInt(req.body.opening);
	req.body.cv = sharedlib.parseCV(req.body.cv);
	
	user.findOne({ username: req.body.company }, (err, data) =>
	{
		if (err)
		{
			console.log("Could find the company");
			return next(err);
		}
		
		// @ts-ignore
		if (!data || !data.company || !data.company.openings || !data.company.openings[req.body.opening])
		{
			return res.status(200).json({ result: "danger", message: "Could not apply for the position." });
		}
		
		let now = Date.now();
		
		// @ts-ignore
		if (now > data.company.openings[req.body.opening].deadline.valueOf())
		{
			return res.status(200).json({ result: "danger", message: "The deadline for this opening has been reached." });
		}
		
		// @ts-ignore
		if (!data.company.openings[req.body.opening].applications)
		{
			// @ts-ignore
			data.company.openings[req.body.opening].applications = [];
		}
		
		let canApply = true;
		
		// @ts-ignore
		for (let i = 0; canApply && i < data.company.openings[req.body.opening].applications.length; ++i)
		{
			// @ts-ignore
			if (data.company.openings[req.body.opening].applications[i].username == req.body.username)
			{
				canApply = false;
			}
		}
		
		if (!canApply)
		{
			return res.status(200).json({ result: "danger", message: "You have already applied for this position!" });
		}
		
		// @ts-ignore
		data.company.openings[req.body.opening].applications.push
		({
			_on: new Date(now),
			username: req.body.username,
			cv: req.body.cv,
			textcover: req.body.textcover ? req.body.textcover : ""
		});
		
		user.updateOne({ username: req.body.company }, data, async (err, raw) =>
		{
			if (err)
			{
				console.log("Could not apply for the position");
				return next(err);
			}
			
			// @ts-ignore
			let opening = data.company.openings[req.body.opening];
			
			let dir = path.join(__dirname, "../../storage/users/", req.body.company, opening.position + "-" + opening.started.valueOf(), req.body.username);
			fs.mkdirSync(dir);
			
			if (req.files)
			{
				let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
				
				if (uploads.files && uploads.files.length == 1 && uploads.files[0].name.endsWith(".pdf"))
				{
					await uploads.files[0].mv(path.join(dir, "cover.pdf"));
				}
			}
			
			res.status(200).json({ result: "success", message: "Successfully applied for the position." });
		});
	});
});

export default router;
