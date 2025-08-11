const express = require('express');
const pool = require('../db/db');

// Get All Entries from this month
router.get('/', async (req, res) => {
    try{
        const monthEntry = await pool.query(
            "SELECT * FROM habit_entries WHERE entry_date >= date_trunc('month', current_timestamp) AND created_at < date_trunc('month', current_timestamp) + interval '1 month';"
        );

        res.status(200).json(monthEntry)
    } catch (err){
        res.status(400).send(err)
    }
})


// Create Entry
router.post('/', async (req, res) => {
    const entry = req.body;
    const habitId = req.params.habitId;

    try{
        const createEntry = await pool.query(
            "INSERT INTO habit_entries (habit_id, entry_date, value) VALUES ($1, current_timestamp, $2) RETURNING id, entry_date",
            [habitId, entry.value]
        )
        res.json({id: createEntry.id, entry, entry_date: createEntry.entry_date});
    } catch (err) {
        res.status(400).send(err);
    }
})

// Delete Entry
router.delete('/:entryId', async (req, res) => {
    const { habitId, entryId } = req.params;
    try{
        const deleteHabit = pool.query('DELETE FROM habit_entries WHERE habitId = $1 AND entry_id = $2', [habitId, entryId]);
        res.send({ message: "habit deleted" });
    } catch (err) {
        res.status(400).send(err);
    } 
})


module.exports = router;