import express from "express";
import { NextFunction } from "connect";

let router = express.Router();

function redirectToIndex(req: express.Request, res: express.Response, next: NextFunction)
{
	if (req.session && req.session.user) next();
	else res.redirect("/index");
}

function redirectToHome(req: express.Request, res: express.Response, next: NextFunction)
{
	if (req.session && req.session.user) res.redirect("/home");
	else next();
}

function redirectIfNotAdmin(req: express.Request, res: express.Response, next: NextFunction)
{
	if (req.session && req.session.user && req.session.user.person && !req.session.user.person.student) next();
	else res.redirect("/home");
}

function redirectIfNotStudent(req: express.Request, res: express.Response, next: NextFunction)
{
	if (req.session && req.session.user && req.session.user.person && req.session.user.person.student) next();
	else res.redirect("/home");
}

function redirectIfNotCompany(req: express.Request, res: express.Response, next: NextFunction)
{
	if (req.session && req.session.user && req.session.user.company) next();
	else res.redirect("/home");
}

router.post("/db/*", redirectToIndex);
router.get("/index", redirectToHome);
router.get("/home", redirectToIndex);
router.get("/profile", redirectToIndex);
router.get("/cvedit", redirectIfNotStudent);
router.get("/job-search", redirectIfNotStudent);
router.get("/new-opening", redirectIfNotCompany);
router.get("/opening/*", redirectToIndex);
router.get("/application/*", redirectIfNotCompany);
router.get("/fair-application", redirectIfNotCompany);
router.get("/admin", redirectIfNotAdmin);
router.all("/admin/*", redirectIfNotAdmin);

export default router;
