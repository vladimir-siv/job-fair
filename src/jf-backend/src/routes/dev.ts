import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import crypto from "crypto";
import env from "../models/env";
import user from "../models/user";
import loc from "../models/loc";

let router = express.Router();

// @test
router.get("/", (req, res, next) =>
{
	res.send("respond with a resource");
});

// @test
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

// @init
router.get("/init-system", (req, res, next) =>
{
	return res.status(200).send("Already done.");
	
	let envs: any =
	[
		{
			active: true,
			cv: false,
			fair: false
		}
	];
	let admins: any =
	[
		{
			username: "vladimir-siv",
			password: crypto.createHash("md5").update("vladimir-siv").digest("hex"),
			person:
			{
				firstname: "Vladimir",
				lastname: "Sivčev",
				phone: "+381 69/42-41-506",
				email: "vladimir.sivcev@gmail.com"
			}
		}
	];
	let locs: any =
	[
		{
			place: "Mesto",
			location:
			[
				{ name: "Sala 1" },
				{ name: "Sala 2" },
				{ name: "Sala 3" },
				{ name: "Sala 4" },
			]
		},
		{
			place: "ETF Beograd",
			location:
			[
				{ name: "Amfiteatar 56" },
				{ name: "Amfiteatar 65" },
				{ name: "Laboratorija 60" },
				{ name: "Svecana sala - Arhitektura" },
				{ name: "Ucionica 310" },
				{ name: "Ucionica 311" }
			]
		},
		{
			place: "Mesto2",
			location:
			[
				{ name: "Sala 5" },
				{ name: "Sala 6" },
				{ name: "Sala 7" },
				{ name: "Sala 8" },
				{ name: "Sala 9" },
			]
		}
	];
	
	let done = (info: any) =>
	{
		if (!envs && !admins && !locs)
		{
			res.status(200).send("success");
		}
	}
	
	env.create(envs, (err: any, data: Document[]) => done(envs = undefined));
	user.create(admins, (err: any, data: Document[]) => done(admins = undefined));
	loc.create(locs, (err: any, data: Document[]) => done(locs = undefined));
});

export default router;
