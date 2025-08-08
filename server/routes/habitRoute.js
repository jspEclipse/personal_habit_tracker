const express = require('express');
const pool = require('../db/db');

const router = express.Router()

// Get all habits
router.get('/', (req, res) => {
    try{
        const getHabits = pool.query('SELECT * FROM HABITS WHERE user_id=$1',[req.userId])
        res.json(getHabits);
    }catch(err) {
        res.send(err)
    }

})

// Create new Habit
router.post('/', (req, res) => {
    const habit = req.body;
    res.send(habit);
})

module.exports = router;