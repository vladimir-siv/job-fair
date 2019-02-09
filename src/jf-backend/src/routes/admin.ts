import express from "express";
import env from "../models/env";
import loc from "../models/loc";
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

export default router;
