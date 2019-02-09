import express from "express";
import fileupload from "express-fileupload";
import fs from "fs";
import path from "path";
import env from "../models/env";
import loc from "../models/loc";
import fair from "../models/fair";
import sharedlib from "../shared/library";

let router = express.Router();

router.post("/create-env", (req, res, next) =>
{
	let bodyKeys = Object.keys(req.body);
	
	if
	(
		bodyKeys.length != 2 && (bodyKeys.length != 3 || req.body.active === undefined)
		||
		req.body.cv === undefined
		||
		req.body.fair === undefined
	)
	{
		return res.status(200).json({ result: "danger", message: "Invalid environment format." });
	}
	
	let create = () =>
	{
		env.create(req.body, (err: any, data: Document[]) =>
		{
			if (err)
			{
				console.log("Could not set new environment.");
				return next(err);
			}
			
			res.status(200).json({ result: "success", message: "Successfully created new environment" });
		});
	};
	
	if (req.body.active)
	{
		env.findOne({ active: true }, (err, data) =>
		{
			if (err)
			{
				console.log("Could not find active environment.");
				return next(err);
			}
			
			if (data)
			{
				// @ts-ignore
				data.active = false;
				env.updateOne({ active: true }, data, (err, raw) =>
				{
					if (err)
					{
						console.log("Could not deactivate active environment.");
						return next(err);
					}
					
					create();
				});
			}
			else create();
		});
	}
	else create();
});

router.post("/update-cv", (req, res, next) =>
{
	if (!sharedlib.contains(Object.keys(req.body), "cv"))
	{
		return res.status(200).json({ result: "danger", message: "Please, specify the CV field." });
	}
	
	env.findOne({ active: true }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not find active environment");
			return next(err);
		}
		
		if (data)
		{
			// @ts-ignore
			data.cv = req.body.cv;
			env.updateOne({ active: true }, data, (err, raw) =>
			{
				if (err)
				{
					console.log("Could not update active environment");
					return next(err);
				}
				
				res.status(200).json({ result: "success", message: "CV editing is now " + (req.body.cv ? "enabled" : "disabled") + "." });
			});
		}
		else res.status(200).json({ result: "danger", message: "Could not find active environment." });
	});
});

router.post("/update-fair", (req, res, next) =>
{
	if (!sharedlib.contains(Object.keys(req.body), "fair"))
	{
		return res.status(200).json({ result: "danger", message: "Please, specify the FAIR field." });
	}
	
	env.findOne({ active: true }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not find active environment");
			return next(err);
		}
		
		if (data)
		{
			// @ts-ignore
			data.fair = req.body.fair;
			env.updateOne({ active: true }, data, (err, raw) =>
			{
				if (err)
				{
					console.log("Could not update active environment");
					return next(err);
				}
				
				res.status(200).json({ result: "success", message: "Applying for Fair is now " + (req.body.fair ? "enabled" : "disabled") + "." });
			});
		}
		else res.status(200).json({ result: "danger", message: "Could not find active environment." });
	});
});

router.get("/fair-locations", (req, res, next) =>
{
	loc.find({}, { place: 1 }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not find locations");
			next(err);
		}
		
		res.status(200).json({ locations: data ? data : undefined });
	});
});

router.post("/create-fair", (req, res, next) =>
{
	if
	(
		req.body.fairinfo == undefined
		||
		req.files == undefined
	)
	{
		return res.status(200).json({ result: "danger", message: "Not all fields present." });
	}
	
	let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
	
	if (uploads.files == undefined || uploads.files.length == 0)
	{
		return res.status(200).json({ result: "danger", message: "Logo not present." });
	}
	
	for (let i = 0; i < uploads.files.length; ++i)
	{
		if (!uploads.files[i].mimetype.startsWith("image/"))
		{
			return res.status(200).json({ result: "danger", message: "Only images are allowd." });
		}
	}
	
	let fairinfo = JSON.parse(req.body.fairinfo);
	fairinfo.start = sharedlib.parseDate(fairinfo.start);
	fairinfo.end = sharedlib.parseDate(fairinfo.end);
	
	if (fairinfo.start.valueOf() > fairinfo.end.valueOf())
	{
		return res.status(200).json({ result: "danger", message: "Start date&time must be before end date&time." });
	}
	
	let now = Date.now();
	let newStartTime = fairinfo.start.valueOf();
	
	if (newStartTime < now)
	{
		return res.status(200).json({ result: "danger", message: "The fair must start in the future." });
	}
	
	fair.find({}).sort({ end: 'desc' }).limit(1).exec((err, data) =>
	{
		if (err)
		{
			console.log("Could not find last fair");
			return next(err);
		}
		
		if (data && data.length > 0)
		{
			// @ts-ignore
			let lastEndTime = data[0].end.valueOf();
			
			if (now < lastEndTime || newStartTime < lastEndTime)
			{
				return res.status(200).json({ result: "danger", message: "The timing for the fair is not valid (too early or the last fair isn't over yet)." });
			}
		}
		
		for (let i = 0; i < fairinfo.packages.length; ++i)
		{
			if (fairinfo.packages[i].videopromotion < 0) fairinfo.packages[i].videopromotion = 0;
			if (fairinfo.packages[i].nolessons < 0) fairinfo.packages[i].nolessons = 0;
			if (fairinfo.packages[i].noworkshops < 0) fairinfo.packages[i].noworkshops = 0;
			if (fairinfo.packages[i].nopresentation < 0) fairinfo.packages[i].nopresentation = 0;
			if (fairinfo.packages[i].price < 0) fairinfo.packages[i].price = 0;
		}
		
		for (let i = 0; i < fairinfo.additional.length; ++i)
		{
			if (fairinfo.additional[i].price < 0) fairinfo.additional[i].price = 0;
		}
		
		fair.create(fairinfo, async (err: any, data: Document[]) =>
		{
			if (err)
			{
				console.log("Could not create new fair");
				return next(err);
			}
			
			let dir = path.join(__dirname, "../../storage/fairs/", fairinfo.name + "-" + newStartTime);
			fs.mkdirSync(dir);
			
			await uploads.files[0].mv(path.join(dir, "logo" + uploads.files[0].name.substring(uploads.files[0].name.lastIndexOf('.'))));
			for (let i = 1; i < uploads.files.length; ++i)
				await uploads.files[i].mv(path.join(dir, "images", uploads.files[i].name));
			
			return res.status(200).json({ result: "success", message: "Successfully created new fair." });
		});
	});
});

router.post("/update-maxcompanies", (req, res, next) =>
{
	if
	(
		req.body.packageno == undefined
		||
		req.body.packageno < 0
		||
		req.body.maxcompanies == undefined
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
			return res.status(200).json({ result: "danger", message: "No fairs present at the current time." });
		}
		
		// @ts-ignore
		let lastStartTime = data[0].start.valueOf();
		let now = Date.now();
		
		if (now > lastStartTime)
		{
			return res.status(200).json({ result: "danger", message: "No fairs present at the current time." });
		}
		
		let currFair = data[0].toJSON();
		
		if (req.body.packageno >= currFair.packages.length)
		{
			return res.status(200).json({ result: "danger", message: "Invalid package." });
		}
		
		if
		(
			currFair.packages[req.body.packageno].maxcompanies < 0
			||
			(
				req.body.maxcompanies >= 0
				&&
				req.body.maxcompanies <= currFair.packages[req.body.packageno].maxcompanies
			)
		)
		{
			return res.status(200).json({ result: "danger", message: "The new value must be greater than the last one (negative numbers mean unlimited)." });
		}
		
		currFair.packages[req.body.packageno].maxcompanies = req.body.maxcompanies;
		
		data[0].update(currFair, (err, raw) =>
		{
			if (err)
			{
				console.log("Could not update current fair");
				return next(err);
			}
			
			res.status(200).json({ result: "success", message: "Successfully changed the value of maxcompanies." });
		});
	});
});

export default router;
