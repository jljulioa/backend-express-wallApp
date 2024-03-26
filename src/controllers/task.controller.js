import wallModel from "../models/wall.model.js"
import userModel from "../models/user.model.js"
import { v4 as uuidv4 } from "uuid"
import {uploadS3} from "../libs/wall.upload.js"
import {uploadProfilePic} from "../libs/profile.pic.js"
import {signedUrl} from "../libs/wall.signer.js"
import {profileSignedUrl} from "../libs/profile.signer.js"
import {deleteS3} from "../libs/wall.delete.js"


const uniqueFilename = () => {
    const shortUuid = uuidv4().substring(0, 6); 
    return `WallAI-${shortUuid}`;
    };

export const uploadProfileTask =  async (req, res) => {


    if (!req.file) {
        console.log(req.file)
        return res.status(400).json({ message: "No file uploaded, file not allowed (jpg, jpeg, png)" });
    }

    const file = req.file
    const userId = req.user.id

    const filename = `profile-${userId.slice(0, 6)}-${uuidv4().substring(0, 6)}.${file.mimetype.split("/")[1]}`

    try {
        const urlprofile = await uploadProfilePic(filename, file, file.mimetype, userId)
        const sigedProfilePic = await profileSignedUrl(urlprofile)
        console.log(sigedProfilePic)
        const profilePic100 = sigedProfilePic[0]
        const profilePic300 = sigedProfilePic[1]

        const userFound = await userModel.findOneAndUpdate({_id: userId}, 
                {profilePic:
                  { url100: profilePic100, url300: profilePic300}
                } 
            , 
            {new: true})
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            profilePic: userFound.profilePic
        }) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUserWallTask = async (req, res) => { 
    console.log(req.user.id)

    try {
        const result = await wallModel.find({user_id: req.user.id}, {key: 1, _id: 0})
        const wallKeys = result.map(item => item.key)
        const urls = await signedUrl(wallKeys)

        res.json(urls)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const uploadTask = async (req, res) => { 

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file

    const filename = uniqueFilename() + `.${file.mimetype.split("/")[1]}`

    const wall = new wallModel({
        key: filename,
        user_id: req.user.id
    })

    try {
        const saveWall = await wall.save();
        const url = await uploadS3(filename, file, file.mimetype)

        res.json({saveWall, url})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const deleteTask = async (req, res) => { 
    console.log(req.query.key)

    if (!req.query.key) {
        return res.status(400).json({ message: "No key provided" });
    }

    const wallKey = req.query.key

    try {
        await wallModel.deleteOne({key: req.query.key})
        const deleteRes = await deleteS3(wallKey)

        res.json({ status: 200, message: `Wallpaper with key ${req.query.key} deleted successfully ${deleteRes}`}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}