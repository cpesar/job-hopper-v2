import 'express-async-errors'
import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
const app = express();
import morgan from 'morgan';
app.use(morgan('tiny'))
import mongoose from 'mongoose'


//Routers
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'

//Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello user');
});



app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/auth', authRouter)

// Error middleware
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}