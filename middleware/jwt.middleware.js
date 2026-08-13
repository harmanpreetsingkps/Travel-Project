import jwt from "jsonwebtoken";
import apiResponse from "../service/response-handler/apiResponse.js";


const verifyJwt = (req, res, next)=>{
    const authHeader = req.headers.authorization;
 if(!authHeader)return res.status(401).send("Unauthorized Access. Please send auth headers")

    const token = authHeader.split(" ")[1] || null
    if(!token)return res.status(401).send("Unauthorized Access")
      
    try {
        const verify =  jwt.verify(token, process.env.ACCESSTOKENSECRET);
    
        req.id = verify.id

        next()
    
    } catch (error) {
        return res.status(401).send("Invalid or Expired Token")
    }

}

export default verifyJwt;
