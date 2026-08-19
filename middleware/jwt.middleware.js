import jwt from "jsonwebtoken";
import apiResponse from "../service/response-handler/apiResponse.js";


const verifyJwt = (req, res, next)=>{
//     const authHeader = req.headers.authorization || req.cookies?.refreshToken;
//  if(!authHeader)return res.status(401).send("Unauthorized Access. Please send auth headers")

//     const token = authHeader.split(" ")[1] || null

    const authHeader = req.header.authorization;
    const authCookie = req.cookies.refreshToken;

    let token = null

    if(authHeader) {
        token = authHeader.split( " " )[1] || null
    }else(
        token = authCookie
    )



    if(!token)return res.status(401).send("Unauthorized Access")
      
    try {
        // const verify =  jwt.verify(token, process.env.ACCESSTOKENSECRET);
        const verify =  jwt.verify(token, process.env.REFRESHTOKENSECRET);

    
        req.id = verify.id
        console.log("Verify JWT " + verify.role)
        req.role = verify.role

        next()
    
    } catch (error) {
        return res.status(401).send("Invalid or Expired Token")
    }

}

export default verifyJwt;
