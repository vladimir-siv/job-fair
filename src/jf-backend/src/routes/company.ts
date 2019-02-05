import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import user from "../models/user";

let router = express.Router();

router.post("/new-opening", (req, res, next) =>
{
	// @ts-ignore
	if (!req.session.user || !req.session.user.company)
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
	
	// @ts-ignore
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
			
			if (req.files)
			{
				let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
				
				for (let i = 0; i < uploads.files.length; ++i)
				{
					if (uploads.files[i].name.endsWith(".pdf"))
					{
						// @ts-ignore
						await uploads.files[i].mv(path.join(__dirname, "../../storage/users/", req.session.user.username, req.body.position + "-" + now, uploads.files[i].name));
					}
				}
			}
			
			res.status(200).json({ result: "success", message: "Successfully publicized new opening!" });
		});
	});
});

export default router;
