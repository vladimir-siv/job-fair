import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import crypto from "crypto";
import imgsize from "image-size";
import user from "../models/user";
import sharedlib from "../shared/library";

let router = express.Router();

router.post("/register-student", (req, res, next) =>
{
	// @ts-ignore
	if (req.session.user) return res.status(200).json({ result: "danger", message: "Already logged in." });
	
	let bodyKeys = Object.keys(req.body);
	let personKeys = Object.keys(req.body.person);
	let studentKeys = Object.keys(req.body.person.student);
	
	if
	(
		bodyKeys.length != 4
		||
		!sharedlib.contains(bodyKeys, "username")
		||
		!sharedlib.contains(bodyKeys, "password")
		||
		!sharedlib.contains(bodyKeys, "pwconfirm")
		||
		!sharedlib.contains(bodyKeys, "person")
		||
		personKeys.length != 5
		||
		!sharedlib.contains(personKeys, "firstname")
		||
		!sharedlib.contains(personKeys, "lastname")
		||
		!sharedlib.contains(personKeys, "phone")
		||
		!sharedlib.contains(personKeys, "email")
		||
		!sharedlib.contains(personKeys, "student")
		||
		studentKeys.length != 2
		||
		!sharedlib.contains(studentKeys, "year")
		||
		!sharedlib.contains(studentKeys, "graduated")
		||
		!req.files
	)
	{
		return res.status(200).json({ result: "danger", message: "One or more fields are missing." });
	}
	
	let usernameCheck = sharedlib.checkusername(req.body.username);
	
	if (usernameCheck != "")
	{
		return res.status(200).json({ result: "danger", message: usernameCheck });
	}
	
	let passwordCheck = sharedlib.checkpassword(req.body.password, req.body.pwconfig);
	
	if (passwordCheck != "")
	{
		return res.status(200).json({ result: "danger", message: passwordCheck });
	}
	
	let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
	
	if (uploads.files.length != 0 || !uploads.files[0].mimetype.startsWith("image/"))
	{
		return res.status(200).json({ result: "danger", message: "Only one image is allowed as a profile picture." });
	}
	
	let dimensions = imgsize(uploads.files[0].data);
	
	if
	(
		dimensions.width < 100 || 300 < dimensions.width
		||
		dimensions.height < 100 || 300 < dimensions.height
	)
	{
		return res.status(200).json({ result: "danger", message: "Profile picture must be of size between 100x100px & 300x300px." });
	}
	
	user.findOne({ username: req.body.username }, (err: any, data: Document) =>
	{
		if (err)
		{
			console.log("Error finding username: \"" + req.body.username + "\"");
			return next(err);
		}
		
		if (data) return res.status(200).json({ result: "danger", message: "Username already in use." });
		
		req.body.password = crypto.createHash("md5").update(req.body.password).digest("hex");
		delete req.body.pwconfirm;
		
		user.create(req.body, (err: any, data: Document[]) =>
		{
			if (err)
			{
				console.log("Error creating username: \"" + req.body.username + "\"");
				return next(err);
			}
			
			uploads.files[0].mv(path.join(__dirname, "../../storage/users/", req.body.username, "profile.png"));
			res.status(200).json({ result: "success", message: "Registration complete." });
		});
	});
});

router.post("/register-company", (req, res, next) =>
{
	// @ts-ignore
	if (req.session.user) return res.status(200).json({ result: "danger", message: "Already logged in." });
	
	let bodyKeys = Object.keys(req.body);
	let company = Object.keys(req.body.company);
	
	if
	(
		bodyKeys.length != 4
		||
		!sharedlib.contains(bodyKeys, "username")
		||
		!sharedlib.contains(bodyKeys, "password")
		||
		!sharedlib.contains(bodyKeys, "pwconfirm")
		||
		!sharedlib.contains(bodyKeys, "company")
		||
		company.length != 9
		||
		!sharedlib.contains(company, "name")
		||
		!sharedlib.contains(company, "address")
		||
		!sharedlib.contains(company, "director")
		||
		!sharedlib.contains(company, "cin")
		||
		!sharedlib.contains(company, "employees")
		||
		!sharedlib.contains(company, "email")
		||
		!sharedlib.contains(company, "web")
		||
		!sharedlib.contains(company, "sector")
		||
		!sharedlib.contains(company, "speciality")
		||
		!req.files
	)
	{
		return res.status(200).json({ result: "danger", message: "One or more fields are missing." });
	}
	
	let usernameCheck = sharedlib.checkusername(req.body.username);
	
	if (usernameCheck != "")
	{
		return res.status(200).json({ result: "danger", message: usernameCheck });
	}
	
	let passwordCheck = sharedlib.checkpassword(req.body.password, req.body.pwconfig);
	
	if (passwordCheck != "")
	{
		return res.status(200).json({ result: "danger", message: passwordCheck });
	}
	
	let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
	
	if (uploads.files.length != 0 || !uploads.files[0].mimetype.startsWith("image/"))
	{
		return res.status(200).json({ result: "danger", message: "Only one image is allowed as a profile picture." });
	}
	
	let dimensions = imgsize(uploads.files[0].data);
	
	if
	(
		dimensions.width < 100 || 300 < dimensions.width
		||
		dimensions.height < 100 || 300 < dimensions.height
	)
	{
		return res.status(200).json({ result: "danger", message: "Profile picture must be of size between 100x100px & 300x300px." });
	}
	
	user.findOne({ username: req.body.username }, (err: any, data: Document) =>
	{
		if (err)
		{
			console.log("Error finding username: \"" + req.body.username + "\"");
			return next(err);
		}
		
		if (data) return res.status(200).json({ result: "danger", message: "Username already in use." });
		
		req.body.password = crypto.createHash("md5").update(req.body.password).digest("hex");
		delete req.body.pwconfirm;
		
		user.create(req.body, (err: any, data: Document[]) =>
		{
			if (err)
			{
				console.log("Error creating username: \"" + req.body.username + "\"");
				return next(err);
			}
			
			uploads.files[0].mv(path.join(__dirname, "../../storage/users/", req.body.username, "profile.png"));
			res.status(200).json({ result: "success", message: "Registration complete." });
		});
	});
});

router.post("/login", (req, res, next) =>
{
	// @ts-ignore
	if (req.session.user) return res.status(200).json({ result: "danger", message: "Already logged in." });
	
	if
	(
		!req.body.username || req.body.username == ""
		||
		!req.body.password || req.body.password == ""
	)
	{
		return res.status(200).json({ result: "danger", message: "Both username & password are required." });
	}
	
	user.findOne({ username: req.body.username, password: crypto.createHash("md5").update(req.body.password).digest("hex") }, (err: any, data: Document) =>
	{
		if (err)
		{
			console.log("Error finding username: \"" + req.body.username + "\"");
			return next(err);
		}
		
		if (data)
		{
			// @ts-ignore
			req.session.user = data;
			// @ts-ignore
			req.session.user.password = "";
			
			res.status(200).json({ result: "success", message: "Login successful." });
		}
		else res.status(200).json({ result: "danger", message: "Invalid credentials." });
	});
});

router.get("/logout", (req, res, next) =>
{
	// @ts-ignore
	delete req.session.user;
	res.redirect("/");
});

router.post("/password", (req, res, next) =>
{
	if
	(
		!req.body.username || req.body.username == ""
		||
		!req.body.password || req.body.password == ""
		||
		!req.body.newpw || req.body.newpw == ""
	)
	{
		return res.status(200).json({ result: "danger", message: "All fields are required." });
	}
	
	let passwordCheck = sharedlib.checkpassword(req.body.newpw, req.body.newpw);
	
	if (passwordCheck != "")
	{
		return res.status(200).json({ result: "danger", message: passwordCheck });
	}
	
	user.findOne({ username: req.body.username, password: crypto.createHash("md5").update(req.body.password).digest("hex") }, (err: any, data: Document) =>
	{
		if (err)
		{
			console.log("Error finding username: \"" + req.body.username + "\"");
			return next(err);
		}
		
		if (data)
		{
			let target = <any>data;
			target.password = crypto.createHash("md5").update(req.body.newpw).digest("hex");
			
			user.updateOne({ username: req.body.username }, target, (err: any, raw: any) =>
			{
				if (err)
				{
					console.log("Error updating username: \"" + req.body.username + "\"");
					return next(err);
				}
				
				res.status(200).json({ result: "success", message: "Successfully changed password." });
			});
		}
		else res.status(200).json({ result: "danger", message: "Invalid credentials." });
	});
});

router.get("/info", (req, res, next) =>
{
	// @ts-ignore
	res.status(200).json({ info: req.session.user });
});

export default router;
