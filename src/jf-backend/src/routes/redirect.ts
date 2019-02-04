import express from "express";
import { NextFunction } from "connect";

let router = express.Router();

function redirectIfNotAdmin(req: express.Request, res: express.Response, next: NextFunction)
{
	// @ts-ignore
	if (req.session.user && req.session.user.person && !req.session.user.person.student) next();
	else res.redirect("/home");
}

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

router.get("/admin", redirectIfNotAdmin);
router.all("/admin/*", redirectIfNotAdmin);
router.get("/index", redirectToHome);
router.get("/home", redirectToIndex);
router.get("/profile", redirectToIndex);

export default router;
