import express from "express";
import fs from "fs";
import path from "path";

let router = express.Router();

router.get("/openings/*", (req, res, next) =>
{
	if (req.session && req.session.user)
		res.status(200).sendFile(path.join(__dirname, "../../storage/users/", decodeURIComponent(req.url.substring(10))));
	else res.status(500).send("Access denied.");
});

router.get("/profile/:username", (req, res, next) =>
{
	let profile = path.join(__dirname, "../../storage/users/", req.params.username, "profile");
	
	if (fs.existsSync(profile + ".png"))
		res.status(200).sendFile(profile + ".png");
	else if (fs.existsSync(profile + ".jpg"))
		res.status(200).sendFile(profile + ".jpg");
	else res.status(500).send("Could not find profile picture.");
});

export default router;
