import express from "express";
import environment from "../models/environment";
import sharedlib from "../shared/library";

let router = express.Router();

router.post("/create-env", (req, res, next) =>
{
	let bodyKeys = Object.keys(req.body);
	
	if
	(
		bodyKeys.length != 1 && (bodyKeys.length != 2 || !req.body.active)
		||
		!req.body.cv
	)
	{
		return res.status(200).json({ result: "failure", message: "Invalid environment format." });
	}
	
	let create = () =>
	{
		environment.create(req.body, (err: any, data: Document[]) =>
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
		environment.findOne({ active: true }, (err, data) =>
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
				environment.updateOne({ active: true }, data, (err, raw) =>
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
		return res.status(200).json({ result: "failure", message: "Please, specify the CV field." });
	}
	
	environment.findOne({ active: true }, (err, data) =>
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
			environment.updateOne({ active: true }, data, (err, raw) =>
			{
				if (err)
				{
					console.log("Could not update active environment");
					return next(err);
				}
				
				res.status(200).json({ result: "success", message: "CV editing is now " + (req.body.cv ? "enabled" : "disabled") + "." });
			});
		}
		else res.status(200).json({ result: "failure", message: "Could not find active environment." });
	});
});

export default router;
