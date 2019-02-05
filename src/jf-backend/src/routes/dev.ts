import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import crypto from "crypto";
import user from "../models/user";

let router = express.Router();

router.get("/", (req, res, next) =>
{
	res.send("respond with a resource");
});

router.post("/upload", async (req, res, next) =>
{
	let code: number = 200;
	let response =
	{
		result: "danger",
		message: "Could not upload file(s)."
	};
	
	if (req.files)
	{
		let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
		
		for (let i = 0; i < uploads.files.length; ++i)
		{
			await uploads.files[i].mv(path.join(__dirname, "../../images/", uploads.files[i].name));
		}
		
		response.result = "success";
		response.message = "Files were uploaded successfully.";
	}
	
	return res.status(code).json(response);
});

router.post("/create-admin", (req, res, next) =>
{
	user.findOne({ username: req.body.username }, (err: any, data: Document) =>
	{
		if (err) return next(err);
		if (data) return res.status(200).json({ result: "danger", message: "Username already in use." });
		
		req.body.password = crypto.createHash("md5").update(req.body.password).digest("hex");
		
		user.create(req.body, (err: any, data: Document[]) =>
		{
			if (err) return next(err);
			res.status(200).json({ result: "success", message: "Successfully created admin." });
		});
	});
});

export default router;
