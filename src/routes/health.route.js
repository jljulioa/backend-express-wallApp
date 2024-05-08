import { Router } from "express";

const router = Router();

router.get('/', async(req, res) => {
   const healthcheck = {
       uptime: process.uptime(),
       message: 'OK',
       timestamp: Date.now()
   };
   try {
       res.send(healthcheck);
   } catch (error) {
       healthcheck.message = error;
       res.status(503).send(healthcheck);
   }
})

export default router