const express = require('express');
const pool = require('../db/db');
const router = express.Router({ mergeParams: true });

// Get All Entries from this month
router.get('/', async (req, res) => {
    try{
        const monthEntry = await pool.query(
            `SELECT * 
            FROM habit_entries 
            WHERE entry_date >= date_trunc('month', current_timestamp) 
                AND entry_date < date_trunc('month', current_timestamp) + interval '1 month';`
        );

        res.status(200).json(monthEntry.rows)
    } catch (err){
        res.status(400).send(err)
    }
})


// Create Entry
router.post('/', async (req, res) => {
    const entry = req.body;
    const { habitId } = req.params;

    try{
        const createEntry = await pool.query(
            "INSERT INTO habit_entries (habit_id, entry_date, value) VALUES ($1, current_timestamp, $2) RETURNING id, entry_date",
            [habitId, entry.value]
        )
        res.json({id: createEntry.rows[0].id, entry, entry_date: createEntry.rows[0].entry_date});
    } catch (err) {
        res.status(400).send(err);
    }
})

// Delete Entry
router.delete('/:entryId', async (req, res) => {
    const { habitId, entryId } = req.params;
    try{
        await pool.query(
            'DELETE FROM habit_entries WHERE habit_id = $1 AND id = $2',
            [habitId, entryId]
        );
        res.send({ message: "habit deleted" });
    } catch (err) {
        res.status(400).send(err);
    } 
})


module.exports = router;