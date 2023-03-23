import jwt from "jsonwebtoken"
import Env from "../config.js"

export default async function Auth(req,res,next){
    
    try {
        //Getting auth token from header to validate the correct user
        const token = req.headers.authorization.split(" ")[1]
        
        //verifying user using jwt
        const decodedToken = await jwt.verify(token,Env.Jwt_token)

        req.user = decodedToken
        // console.log(req.user)
        next()
        
    } catch (error) {
        return res.status(500).send(error)
    }

}



export function localVariable(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}