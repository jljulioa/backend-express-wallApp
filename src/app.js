import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.route.js'
import cookieparser from 'cookie-parser'
import taskRouter from './routes/task.route.js'
import cors from 'cors'
import { whiteList } from './config.js'

const whitelist = [
    'http://54.204.67.62:31444',
    'http://54.234.165.228:31444',
    'http://localhost:5173'
  ];

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
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
app.use(cookieparser());
app.use('/api/auth',authRouter);
app.use('/api/wall',taskRouter)


export default app