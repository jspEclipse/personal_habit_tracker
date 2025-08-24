require('dotenv').config({path:'../.env'})
const express = require('express');
const authRouter = require('./routes/authRoute');
const habitRouter = require('./routes/habitRoute');
const cors = require('cors')
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you need to send cookies
}));


app.use(express.json())

app.use('/auth', authRouter);
app.use('/habit', authMiddleware, habitRouter)

app.listen(PORT, () => {
    console.log(`port is open on ${PORT}`)
})