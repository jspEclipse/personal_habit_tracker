const express = require('express');
const pool = require('../db/db');
const entryRouter = require('./entryRoute');

const router = express.Router()

// Get all habits
router.get('/', async (req, res) => {
    try{
        const getHabits = await pool.query('SELECT * FROM HABITS WHERE user_id=$1',[req.userId])
        res.json(getHabits);
    }catch(err) {
        res.send(err)
    }

})

// Create new Habit
router.post('/', async (req, res) => {
    const habit = req.body;
    try {
        if(habit.type = "quantity"){
            const insertHabit = await pool.query(
                'INSERT INTO habits (user_id, name, type, goal_quantity) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
                [req.userId, habit.name, habit.type, habit.goal_quantity]
            );

            res.json({ id: insertHabit.id, habit, created_at: insertHabit.created_at })
        }else{
            const insertHabit = await pool.query(
                'INSERT INTO habits (user_id, name, type) VALUES ($1, $2, $3) RETURNING id created_at',
                [req.userId, habit.name, habit.type]
            );
            
            res.json({ id: insertHabit.id, habit, created_at: insertHabit.created_at })
        }
    } catch (err) {
        res.send(err);
    }
})

router.put('/:userId', async (req, res) => {
    const updateHabit = req.body;
    const { userId } = req.params;

    try {
        const habit = await pool.query("SELECT * FROM habits WHERE id=$1", [userId]);
        
        if (habit.rows.length === 0) {
            return res.status(404).json({ error: "Habit not found" });
        }

        const existingHabit = habit.rows[0];
        
        if (existingHabit.type === "boolean" && updateHabit.type === "quantity" && updateHabit.goal_quantity === null) {
            return res.status(400).json({ error: "must provide goal with quantity" });
        }

        let updatedHabit;
        
        if (updateHabit.type === "quantity") {
            const update = await pool.query(
                'UPDATE habits SET name = $1, type = $2, goal_quantity = $3 WHERE id = $4 RETURNING *',
                [updateHabit.name, updateHabit.type, updateHabit.goal_quantity, userId]
            );
            updatedHabit = update.rows[0];
        } else {
            const update = await pool.query(
                'UPDATE habits SET name = $1, type = $2, goal_quantity = $3 WHERE id = $4 RETURNING *',
                [updateHabit.name, updateHabit.type, null, userId]
            );
            updatedHabit = update.rows[0];
        }

        res.status(200).json(updatedHabit);
        
    } catch (err) {
        console.error('Error updating habit:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/:habitId', async (req, res) => {
    const { habitId } = req.params;
    const userId = req.userId
    try{
        const deleteHabit = pool.query('DELETE FROM habits WHERE habitId = $1 AND user_id = $2', [habitId, userId]);
        res.send({ message: "habit deleted" });
    } catch (err) {
        res.status(400).send(err);
    }
})

router.use('/:habitId/entry', entryRouter);


module.exports = router;