import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.route.js'
import cookieparser from 'cookie-parser'
import taskRouter from './routes/task.route.js'
import cors from 'cors'

const allowedOrigins = [
    '54.211.21.161',
    '54.243.21.80',
  ];


const app = express()

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieparser());
app.use('/api/auth',authRouter);
app.use('/api/wall',taskRouter)


export default app