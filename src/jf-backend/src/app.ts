import express from "express";
import session from "express-session";
import fileupload from "express-fileupload";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import logger from "morgan";
import path from "path";

import devRouter from "./routes/dev";
import dbRouter from "./routes/db";
import redirectRouter from "./routes/redirect";
import adminRouter from "./routes/admin";
import accountRouter from "./routes/account";

let angularApp = express.static(path.join(__dirname, "../../jf-frontend/dist/jf-frontend"));

let app = express();

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/job-fair", { useNewUrlParser: true, promiseLibrary: bluebird })
	.then(() => console.log("mongo connection succesful"))
	.catch((err: express.Errback) => console.error(err));

app.use
(
	session
	({
		secret: "#Th15 15 4 53cr37 p455w0rd 70 pr073c7 S35510n ID5!",
		resave: false,
		saveUninitialized: false
	})
);

app.use
(
	fileupload
	({
		createParentPath: true,
		limits: { fileSize: 25 * 1024 * 1024 },
		//useTempFiles: true,
		//tempFileDir: "\\..\\..\\..\\tmp\\",
		safeFileNames: true,
		preserveExtension: 10,
		abortOnLimit: true,
		parseNested: true
	})
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(angularApp);

app.use("/dev", devRouter);
app.use("/db", dbRouter);

app.use("/", redirectRouter);

app.use("/admin", adminRouter);
app.use("/account", accountRouter);

app.use("/*", angularApp);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err: { message: string, status: number }, req: express.Request, res: express.Response, next: express.NextFunction) =>
{
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
