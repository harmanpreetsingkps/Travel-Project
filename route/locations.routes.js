import express from 'express'
import  { addSubLocation,addSubLocationHealthCheck } from "../controller/subLocation.controller.js";
import verifyJwt from '../middleware/jwt.middleware.js';
import { addCountry, getAllLocation } from '../controller/location.controller.js';
import checkUserType from '../middleware/AccessControl.middleware.js';


const locationRouter = express.Router()
locationRouter.route("/add-sub-location").post( addSubLocation)
locationRouter.route("/healthcheck").get(verifyJwt, addSubLocationHealthCheck)
locationRouter.route("/add-country").post(verifyJwt,checkUserType("admin"),addCountry)
locationRouter.route("/get-countries").get(verifyJwt, getAllLocation)

export default locationRouter;