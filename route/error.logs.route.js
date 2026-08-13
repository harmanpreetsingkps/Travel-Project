import readFileData from "../controller/readFile.constroller.js"
import express from "express";

const logRouter = express.Router();

logRouter.route("/read-logs").get(readFileData);

export default logRouter;