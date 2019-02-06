import express from "express";
import fileupload from "express-fileupload";
import path from "path";
import crypto from "crypto";
import imgsize from "image-size";
import rimraf from "rimraf";
import user from "../models/user";
import environment from "../models/environment";
import sharedlib from "../shared/library";

let router = express.Router();

router.post("/register-student", (req, res, next) =>
{
	if (req.session && req.session.user) return res.status(200).json({ result: "danger", message: "Already logged in." });
	
	let bodyKeys = Object.keys(req.body);
	
	if
	(
		bodyKeys.length != 9
		||
		!sharedlib.contains(bodyKeys, "username")
		||
		!sharedlib.contains(bodyKeys, "password")
		||
		!sharedlib.contains(bodyKeys, "pwconfirm")
		||
		!sharedlib.contains(bodyKeys, "firstname")
		||
		!sharedlib.contains(bodyKeys, "lastname")
		||
		!sharedlib.contains(bodyKeys, "phone")
		||
		!sharedlib.contains(bodyKeys, "email")
		||
		!sharedlib.contains(bodyKeys, "year")
		||
		!sharedlib.contains(bodyKeys, "graduated")
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
	
	let passwordCheck = sharedlib.checkpassword(req.body.password, req.body.pwconfirm);
	
	if (passwordCheck != "")
	{
		return res.status(200).json({ result: "danger", message: passwordCheck });
	}
	
	let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
	
	if (uploads.files.length != 1 || !uploads.files[0].mimetype.startsWith("image/"))
	{
		return res.status(200).json({ result: "danger", message: "Only one image is allowed as a profile picture." });
	}
	
	if (!sharedlib.validateImgType(uploads.files[0].name))
	{
		return res.status(200).json({ result: "danger", message: "Invalid image type." });
	}
	
	user.findOne({ username: req.body.username }, (err: any, data: Document) =>
	{
		if (err)
		{
			console.log("Error finding username: \"" + req.body.username + "\"");
			return next(err);
		}
		
		if (data) return res.status(200).json({ result: "danger", message: "Username already in use." });
		
		req.body.person =
		{
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			phone: req.body.phone,
			email: req.body.email,
			student:
			{
				year: req.body.year,
				graduated: req.body.graduated
			}
		}
		
		delete req.body.firstname;
		delete req.body.lastname;
		delete req.body.phone;
		delete req.body.email;
		delete req.body.year;
		delete req.body.graduated;
		
		req.body.company = undefined;
		
		req.body.password = crypto.createHash("md5").update(req.body.password).digest("hex");
		delete req.body.pwconfirm;
		
		let filepath = path.join(__dirname, "../../storage/users/", req.body.username);
		let file = path.join(filepath, "profile" + uploads.files[0].name.substring(uploads.files[0].name.lastIndexOf('.')));
		
		uploads.files[0].mv(file, err =>
		{
			if (err) return res.status(200).json({ result: "danger", message: "Could not upload profile picture." });
			
			let dimensions = imgsize(file);
			
			if
			(
				dimensions.width < 100 || 300 < dimensions.width
				||
				dimensions.height < 100 || 300 < dimensions.height
			)
			{
				rimraf.sync(filepath);
				return res.status(200).json({ result: "danger", message: "Profile picture must be of size between 100x100px & 300x300px." });
			}
			
			user.create(req.body, (err: any, data: Document[]) =>
			{
				if (err)
				{
					console.log("Error creating username: \"" + req.body.username + "\"");
					return next(err);
				}
				
				res.status(200).json({ result: "success", message: "Registration complete." });
			});
		});
	});
});

router.post("/register-company", (req, res, next) =>
{
	if (req.session && req.session.user) return res.status(200).json({ result: "danger", message: "Already logged in." });
	
	let bodyKeys = Object.keys(req.body);
	
	if
	(
		bodyKeys.length != 12
		||
		!sharedlib.contains(bodyKeys, "username")
		||
		!sharedlib.contains(bodyKeys, "password")
		||
		!sharedlib.contains(bodyKeys, "pwconfirm")
		||
		!sharedlib.contains(bodyKeys, "name")
		||
		!sharedlib.contains(bodyKeys, "address")
		||
		!sharedlib.contains(bodyKeys, "director")
		||
		!sharedlib.contains(bodyKeys, "cin")
		||
		!sharedlib.contains(bodyKeys, "employees")
		||
		!sharedlib.contains(bodyKeys, "email")
		||
		!sharedlib.contains(bodyKeys, "web")
		||
		!sharedlib.contains(bodyKeys, "sector")
		||
		!sharedlib.contains(bodyKeys, "speciality")
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
	
	let passwordCheck = sharedlib.checkpassword(req.body.password, req.body.pwconfirm);
	
	if (passwordCheck != "")
	{
		return res.status(200).json({ result: "danger", message: passwordCheck });
	}
	
	let uploads = <{ files: fileupload.UploadedFile[] }>req.files;
	
	if (uploads.files.length != 1 || !uploads.files[0].mimetype.startsWith("image/"))
	{
		return res.status(200).json({ result: "danger", message: "Only one image is allowed as a profile picture." });
	}
	
	if (!sharedlib.validateImgType(uploads.files[0].name))
	{
		return res.status(200).json({ result: "danger", message: "Invalid image type." });
	}
	
	user.findOne({ username: req.body.username }, (err: any, data: Document) =>
	{
		if (err)
		{
			console.log("Error finding username: \"" + req.body.username + "\"");
			return next(err);
		}
		
		if (data) return res.status(200).json({ result: "danger", message: "Username already in use." });
		
		req.body.company =
		{
			name: req.body.name,
			address: req.body.address,
			director: req.body.director,
			cin: req.body.cin,
			employees: req.body.employees,
			email: req.body.email,
			web: req.body.web,
			sector: req.body.sector,
			speciality: req.body.speciality
		};
		
		delete req.body.name;
		delete req.body.address;
		delete req.body.director;
		delete req.body.cin;
		delete req.body.employees;
		delete req.body.email;
		delete req.body.web;
		delete req.body.sector;
		delete req.body.speciality;
		
		req.body.student = undefined;
		
		req.body.password = crypto.createHash("md5").update(req.body.password).digest("hex");
		delete req.body.pwconfirm;
		
		let filepath = path.join(__dirname, "../../storage/users/", req.body.username);
		let file = path.join(filepath, "profile" + uploads.files[0].name.substring(uploads.files[0].name.lastIndexOf('.')));
		
		uploads.files[0].mv(file, err =>
		{
			if (err) return res.status(200).json({ result: "danger", message: "Could not upload profile picture." });
			
			let dimensions = imgsize(file);
			
			if
			(
				dimensions.width < 100 || 300 < dimensions.width
				||
				dimensions.height < 100 || 300 < dimensions.height
			)
			{
				rimraf.sync(filepath);
				return res.status(200).json({ result: "danger", message: "Profile picture must be of size between 100x100px & 300x300px." });
			}
			
			user.create(req.body, (err: any, data: Document[]) =>
			{
				if (err)
				{
					console.log("Error creating username: \"" + req.body.username + "\"");
					return next(err);
				}
				
				res.status(200).json({ result: "success", message: "Registration complete." });
			});
		});
	});
});

router.post("/login", (req, res, next) =>
{
	if (!req.session) return res.status(200).json({ result: "danger", message: "Could not login." });
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
		// won't ever happen
		if (!req.session) return;
		
		if (err)
		{
			console.log("Error finding username: \"" + req.body.username + "\"");
			return next(err);
		}
		
		if (data)
		{
			req.session.user = data;
			req.session.user.password = "";
			
			res.status(200).json({ result: "success", message: "Login successful." });
		}
		else res.status(200).json({ result: "danger", message: "Invalid credentials." });
	});
});

router.get("/logout", (req, res, next) =>
{
	if (req.session) delete req.session.user;
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
	res.status(200).json({ info: req.session ? req.session.user : undefined });
});

router.post("/updatecv", (req, res, next) =>
{
	if (!req.session || !req.session.user || !req.session.user.person || !req.session.user.person.student)
	{
		return res.status(200).json({ result: "danger", message: "Could not update CV." });
	}
	
	if (!req.body.cv)
	{
		return res.status(200).json({ result: "danger", message: "CV data not supplied." });
	}
	
	environment.findOne({ active: true }, (err, data) =>
	{
		if (err)
		{
			console.log("Could not fetch active environment");
			return next(err);
		}
		
		// @ts-ignore
		if (!data.cv)
		{
			return res.status(200).json({ result: "danger", message: "CV editing is currently not possible. Please, check again later." });
		}
		
		// @ts-ignore
		user.findOne({ username: req.session.user.username }, (err, accinfo) =>
		{
			if (err)
			{
				console.log("Could not fetch user");
				return next(err);
			}
			
			if (!accinfo)
			{
				// should never happen
				return res.status(200).json({ result: "danger", message: "CV was not successfully updated." });
			}
			
			// @ts-ignore
			accinfo.person.student.cv = req.body.cv;
			
			// @ts-ignore
			user.updateOne({ username: req.session.user.username }, accinfo, (err, raw) =>
			{
				if (err)
				{
					console.log("Could not update cv");
					return next(err);
				}
				
				// @ts-ignore
				req.session.user.person.student.cv = req.body.cv;
				res.status(200).json({ result: "success", message: "Successfully updated CV." });
			});
		});
	});
});

export default router;
