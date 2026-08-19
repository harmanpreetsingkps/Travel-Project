import User from "../models/user.model.js"
import errorResponse from "../service/response-handler/errorResponse.js"

const checkUserType = (...allowedUser)=>{

    return (req, res, next)=>{
        console.log("Access controll middleware " + req.role)
        if(allowedUser.includes(req.role))return next()

           return res.status(403).json(new errorResponse (403, "Forbidden") )
            
    }
}

export default checkUserType