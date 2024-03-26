import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config.js";

export const authRequired = (req, res, next) => {
    console.log(req.cookies)
   if(req.cookies.token) {
    return jwt.verify(req.cookies.token, JWT_KEY, (err, user) => {
        if(err) {
            return res.status(401).json({message: ["Unauthorized access"]});
        }
        req.user = user;
        next();
    });
   } else {
       return res.status(401).json({message: ["No Token, Unauthorized"]});
   }
}