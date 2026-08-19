import express from "express";
import { currentUser, deleteUser, loginUser, logout, registerUser } from "../controller/user.controller.js";
import upload from "../service/multer/multer.js";
import verifyJwt from "../middleware/jwt.middleware.js";
import checkUserType from "../middleware/AccessControl.middleware.js";
import addCountry from "../controller/location.controller.js";

const router = express.Router()

//"/user/register-user"
router.route('/register-user').post(upload.single("avatar"),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJwt,logout);
router.route('/current-user').get(verifyJwt, currentUser);
router.route('/delete-user').get(verifyJwt, deleteUser)
router.route('/add-country').post(verifyJwt,checkUserType("admin"),addCountry)


export default router;