import 'express-async-errors'
import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
const app = express();
import morgan from 'morgan';
app.use(morgan('tiny'))
import mongoose from 'mongoose'
import { body, validationResult } from 'express-validator'

//Routers
import jobRouter from './routes/jobRouter.js'

//Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello user');
});

app.post('/api/v1/test',
    [
        body('name')
            .notEmpty()
            .withMessage('name is required')
            .isLength({ min: 50 })
            .withMessage('name must be at least 50 characters long')
    ],
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((errors) => errors.msg)
            return res.status(404).json({ errors: errorMessages })
        }
        next()
    },
    (req, res) => {
        const { name } = req.body
        res.json({ message: `hello ${name}` })
    })

app.use('/api/v1/jobs', jobRouter)

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