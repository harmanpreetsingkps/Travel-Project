import express from 'express'
import  { addSubLocation,addSubLocationHealthCheck } from "../controller/subLocation.controller.js";
import verifyJwt from '../middleware/jwt.middleware.js';


const locationRouter = express.Router()
locationRouter.route("/add-sub-location").post( addSubLocation)
locationRouter.route("/healthcheck").get(verifyJwt, addSubLocationHealthCheck)

export default locationRouter;