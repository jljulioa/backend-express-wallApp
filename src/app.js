import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.route.js'
import cookieparser from 'cookie-parser'
import taskRouter from './routes/task.route.js'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: '[http://localhost:8085, http://localhost:5173]',
    credentials: true
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieparser());
app.use('/api/auth',authRouter);
app.use('/api/wall',taskRouter)


export default app