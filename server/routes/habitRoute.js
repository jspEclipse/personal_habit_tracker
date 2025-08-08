const express = require('express');
const pool = require('../db/db');

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
                'INSERT INTO habits (user_id, name, type, goal_quantity) VALUES ($1, $2, $3, $4) RETURNING id created_at',
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

router.put('/:id', async (req, res) => {
    const updateHabit = req.body;
    const { id } = req.params;

    try {
        const habit = await pool.query("SELECT * FROM habits WHERE id=$1", [id]);
        
        // Check if habit exists
        if (habit.rows.length === 0) {
            return res.status(404).json({ error: "Habit not found" });
        }

        const existingHabit = habit.rows[0];
        
        // Validation: if changing from boolean to quantity, must provide goal_quantity
        if (existingHabit.type === "boolean" && updateHabit.type === "quantity" && updateHabit.goal_quantity === null) {
            return res.status(400).json({ error: "must provide goal with quantity" });
        }

        let updatedHabit;
        
        if (updateHabit.type === "quantity") {
            const update = await pool.query(
                'UPDATE habits SET name = $1, type = $2, goal_quantity = $3 WHERE id = $4 RETURNING *',
                [updateHabit.name, updateHabit.type, updateHabit.goal_quantity, id]
            );
            updatedHabit = update.rows[0];
        } else {
            const update = await pool.query(
                'UPDATE habits SET name = $1, type = $2, goal_quantity = $3 WHERE id = $4 RETURNING *',
                [updateHabit.name, updateHabit.type, null, id]
            );
            updatedHabit = update.rows[0];
        }

        res.status(200).json(updatedHabit);
        
    } catch (err) {
        console.error('Error updating habit:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.userId
    try{
        const deleteHabit = pool.query('DELETE FROM habits WHERE id = $1 AND user_id = $2', [id, userId]);
        res.send({ message: "habit deleted" });
    } catch (err) {
        res.status(400).send(err);
    }
})


module.exports = router;