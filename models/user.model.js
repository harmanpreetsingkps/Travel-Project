import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "guide", "admin"],
            default : "user"
        },
        refreshToken: {
            type: String,
            default: null
        }
    }
    
    ,{timeStamps: true})

        userSchema.pre("save", async function(){
            if(!this.isModified("password")) return
            this.password = await bcrypt.hash(this.password, 10)
        })


        userSchema.methods.generateAccessToken = function(){
            return jwt.sign(
                {
                    id:this._id,
                    role: this.role
                },
                process.env.ACCESSTOKENSECRET,
                {expiresIn: "15m"}
            )
        }

        userSchema.methods.generateRefreshToken = function(){
            return jwt.sign(
                {
                    id: this._id
                },
                process.env.REFRESHTOKENSECRET,
                {expiresIn: "1d"}
            )
        }

         const User = mongoose.model("User", userSchema)

         export default User;