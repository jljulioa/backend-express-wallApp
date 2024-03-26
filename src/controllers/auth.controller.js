import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {accessToken} from "../libs/jwt.js";
import { JWT_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await userModel.findOne({email});
        if (user) {
            return res.status(400).json({message: ["User already exists"]});
        };

        const passHash = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            username,
            email,
            password: passHash,
        });

        const saveUser = await newUser.save();
        const token = await accessToken({id: saveUser._id});

        res.cookie("token", token);        
        res.json({
            id: saveUser._id,
            username: saveUser.username,
            email: saveUser.email,
            updatedAt: saveUser.updatedAt,
            createdAt: saveUser.createdAt,          
        });
       
    } catch (error) {
        res.status(500).json({message: error.message});
    };
}

export const loging = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(400).json({message: ["Invalid credentials"]});
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: ["Invalid password"]});
        };
        const token = await accessToken({id: user._id, emial: user.email});
        res.cookie("token", token);
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
            profilePic: user.profilePic,
        });

} catch (error) {
    res.status(500).json({message: error.message});
}
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logout successful"});
}

export const profile = async (req, res) => {
    const userFound = await userModel.findOne({_id: req.user.id})

    if(!userFound) {
        return res.status(404).json({message: "User not found"});
    } else {
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            profilePic: userFound.profilePic
        });
    }
}

export const VerifyToken = async (req, res) => {
    const { token } = req.cookies;

    console.log(token)
    if (!token) {
        return res.status(401).json({message: ["No Token, Unauthorized"]});
    }
    jwt.verify(token, JWT_KEY, async (err, user) => {
        if(err) {
            return res.status(401).json({message: ["Unauthorized access"]});

        }
        const userFound = await userModel.findOne({_id: user.id})
        if(!userFound) {
            return res.status(404).json({message: ["User not found, unauthorized"]});
        }

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            profilePic: userFound.profilePic
        });
    });
}