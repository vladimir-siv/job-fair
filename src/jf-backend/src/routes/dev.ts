import express from "express";
import fileupload from "express-fileupload";
import path from "path";
let router = express.Router();

router.get("/", (req, res, next) =>
{
	res.send("respond with a resource");
});

router.post("/upload", (req, res, next) =>
{
	console.log("SINE OVDE JE VELIKI BAG NEKI");
	
	let code: number = 200;
	let response =
	{
		result: "failure",
		message: "Could not upload file(s)."
	};
	
	if (req.files)
	{
		let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
		let success = true;
		
		for (let i = 0; i < uploads.files.length; ++i)
		{
			uploads.files[i].mv(path.join(__dirname, "../../images/", uploads.files[i].name), err => success = err ? false : success);
		}
		
		if (success)
		{
			response.result = "success";
			response.message = "Files were uploaded successfully.";
		}
	}
	
	return res.status(code).send(response);
});

export default router;
