import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.route.js'
import cookieparser from 'cookie-parser'
import taskRouter from './routes/task.route.js'
import healthRouter from './routes/health.route.js'
import cors from 'cors'
import { whiteList } from './config.js'

const whitelistCORS = whiteList;

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelistCORS.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }

const app = express()

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieparser({sameSite: "none"}));
app.use('/api/auth',authRouter);
app.use('/api/wall',taskRouter);
app.use('/api/health',healthRouter);


export default app