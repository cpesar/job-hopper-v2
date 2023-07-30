
import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
const app = express();
import morgan from 'morgan';

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
const port = process.env.PORT || 5100

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Does this really work');
});

app.post('/', (req, res) => {
    console.log(req)
    res.json({ message: 'Data received', data: req.body })
})

// 
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});