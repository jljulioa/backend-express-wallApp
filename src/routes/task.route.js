import { Router } from "express";
import { authRequired } from "../middlewares/verifyToken.js";
import { errorMulter } from "../middlewares/errorMulter.middleware.js";
import {  uploadTask, getUserWallTask, uploadProfileTask, deleteTask } from "../controllers/task.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage: storage,fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null);
    }
}});


const router = Router();

router.post('/upload', authRequired, upload.single('image'), uploadTask);
router.get('/getkeys', authRequired, getUserWallTask);
router.post('/profilepic', authRequired, upload.single('avatar'), uploadProfileTask);
router.delete('/delete', authRequired, deleteTask)

export default router