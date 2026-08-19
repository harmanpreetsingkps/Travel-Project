import asyncHandler from "../service/error-handler/asyncErrorHandler.js";
import User from "../models/user.model.js";
import apiResponse from "../service/response-handler/apiResponse.js";
import errorResponse from "../service/response-handler/errorResponse.js";
import cloudinary from "../utils/cloudinary/cloudinary.config.js";
import path from "path";
import bcrypt from "bcrypt"



const registerUser = asyncHandler(async (req, res) => {
    // if(req)  throw new errorResponse(500, "Error Happend in register user")

    // console.log(req.body)
    // const {name, username,  password, avatar} = req.body ||{};

    // if(!name || !username || !password || !avatar)return res.status(400).json(new apiResponse(400, "Please send all the required data", ))
    //  return res.status(200).send("Done")
    // })



    const { name, username, email, password, avatar } = req.body || {};
    if (!name || !username || !password) return res.status(400).json(new apiResponse(400, "Please send all the required data",))

    const existedUser = await User.findOne({ username, email });

    if (existedUser) return res.status(409).json(
        new apiResponse("409", "false", "User already exists")
    )

    let uploadedFile;
    if (avatar) {
        uploadedFile = await cloudinary.uploader.upload(req.file.path)
        console.log(uploadedFile)
    }
    
   
    const savedUser = await User.create({
        name,
        username,
        email,
        password,
        avatar: uploadedFile?.secure_url || ""
    })

    const generatedAccessToken = savedUser.generateAccessToken(savedUser._id);
    const generatedRefreshToken = savedUser.generateRefreshToken(savedUser._id);

    if (!generatedAccessToken || !generatedRefreshToken) throw new errorResponse(500, "Failed to generate tokens")
    const tokenAdded = await User.findByIdAndUpdate(savedUser._id, {
        $set: { refreshToken: generatedRefreshToken }
    })

    if (!tokenAdded) return new errorResponse(500, "Unable to token operations")
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: true
    };
    const user = await User.findById(savedUser._id).select("-password  -refreshToken")
    return res.status(200).cookie(
        "refreshToken", generatedRefreshToken, options
    ).json(
        new apiResponse(200, "User Registered Sucessfully", { AccessToken: generatedAccessToken })
    )

})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) return res.status(400).json(new apiResponse(400, "Please send all the required data",));

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json(new apiResponse(404, "User not found"));

    const comparePassword = await bcrypt.compare(password, user.password)

    if (comparePassword) {

        const generatedAccessToken = user.generateAccessToken(user._id);
        const generatedRefreshToken = user.generateRefreshToken(user._id);

        user.refreshToken = generatedRefreshToken;

        user.save()
        const options = {
        httpOnly: true,
        // secure: true,
        // sameSite: true
        secure: false,
        sameSite: "lax"
    }
        return res.status(200).cookie("refreshToken", generatedRefreshToken, options).json(
            new apiResponse(200,
                "Logged In Sucessfully",
                { AccessToken: generatedAccessToken }
            )
        )
    } else {
        return res.status(500).json(
            new apiResponse(500, "Not Able to login user")
        )
    }
})

const logout = asyncHandler(async (req, res) => {

    const user = await User.findById(req.id);

    if (!user) {
        return res.status(404).json(
            new apiResponse(404, "User not found")
        )
    }

    user.refreshToken = null;
    user.save();
    const options = {
        httpOnly: true,
        // secure: true,
        // sameSite: true
        secure: false,
        sameSite: "lax"
    }
    return res.status(200).cookie("refreshToken", " ", options).json(
        new apiResponse(200, "User logged out sucessfully", { AccessToken: null })
    )

})

const currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.id).select("-password -refreshToken") || null;

    if (!user) return res.status(404).json(
        new apiResponse(404, "User Not Found", null)
    )

    return res.status(200).json(
        new apiResponse(200, " Current User Found Successfully", user)
    )
})


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.id).select("-password -refreshToken") || null;

    if (!user) return res.status(404).json(
        new apiResponse(404, "User Not Found", null)
    )

    const deletedUser = await User.findByIdAndDelete(req.id);
    if (!deleteUser) return res.status(500).json(new apiResponse(500, "Unable to Delete user"))
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: true
    }
    return res.status(200).cookie("refreshToken", " ", options).json(
        new apiResponse(200, "User Deleted Successfully", null)
    )
})


export { registerUser, loginUser, logout, currentUser, deleteUser }