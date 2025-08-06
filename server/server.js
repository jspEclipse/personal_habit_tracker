const express = require('express');
const authRouter = require('./routes/authRoute');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 4000;

app.use(express.json())

app.use('/auth', authMiddleware, authRouter);

app.listen(PORT, () => {
    console.log(`port is open on ${PORT}`)
})