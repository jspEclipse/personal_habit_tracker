const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const pool = require('../db/db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try{
        const emailCheck = await pool.query(`
        SELECT 1 FROM users WHERE email = $1
      `, [email]);

        if(emailCheck.rowCount > 0){
            res.sendStatus(400).send('user already exists')
        }

        const insertUser = await pool.query(`
        INSERT INTO users (email, password_hash) values ($1, $2) RETURNING id
        `, [email, hashedPassword])

        const token = jwt.sign({ id: insertUser.id }, process.env.JWT_SECRET, { expiresIn: '24h'})
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }


})

router.post('/login', async (req, res) => {
    // we get their email, and we look up the password associated with that email in the database
    // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
    // so what we can to do, is again, one way encrypt the password the user just entered
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try{
        const getUser = await pool.query('SELECT id, email, password_hash FROM users WHERE email=$1', [email]);

        if(getEmail.rowCount == 0){
            res.sendStatus(404).send('Invalid credentials');
        }

        const user = getUser.rows[0];

        const isValidPassword = bcrypt.compareSync(password, user.password_hash);

        if(!isValidPassword){
            res.sendStatus(401).send('Incorrect Password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503)
    }
})

module.exports = router;