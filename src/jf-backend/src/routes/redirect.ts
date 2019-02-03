import express from "express";
import path from "path";
import { NextFunction } from "connect";

let router = express.Router();

function redirectToIndex(req: express.Request, res: express.Response, next: NextFunction)
{
	// @ts-ignore
	if (req.session.user) next();
	else res.redirect("/index");
}

function redirectToHome(req: express.Request, res: express.Response, next: NextFunction)
{
	// @ts-ignore
	if (req.session.user) res.redirect("/home");
	else next();
}

router.get("/index", redirectToHome);
router.get("/home", redirectToIndex);
router.get("/profile", redirectToIndex);

export default router;
