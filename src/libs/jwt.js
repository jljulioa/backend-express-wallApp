import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config.js";


export function accessToken(payload) {
   return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_KEY, {
        expiresIn: "1d"
    },
    (err, token) => {
        if (err) {
            reject(err);
        }
        resolve(token);
    });
   })
}


