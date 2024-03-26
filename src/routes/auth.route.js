import { Router } from "express";
import { register, loging, logout, profile, VerifyToken} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/verifyToken.js";
import { validatorSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validatorSchema(registerSchema), register);
router.post('/login', validatorSchema(loginSchema), loging);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
router.get('/verify', VerifyToken)

export default router