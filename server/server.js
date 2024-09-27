const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

//----------CRUD OPERATIONS
// Check the backend is set up properly
app.get('/', (req, res) => {
    res.json({ message: 'The backend is up and running...' });
});

// GET request route connected to PostgreSQL
// Join 'authentic_humans' and 'ah_sightings' to add the sighting date
app.get('/authentic_humans', async (req, res) => {
    try {
        const query = `
        SELECT ah.*, TO_CHAR(asg.date, 'YYYY-MM-DD') AS date 
        FROM authentic_humans AS ah
        LEFT JOIN ah_sightings AS asg ON ah.id = asg.id
        ORDER BY ah.name DESC 
    `;
        const { rows: sightings } = await db.query(query);
        res.send(sightings);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// POST request -> Insert into both 'authentic_humans' and 'ah_sightings'
app.post('/authentic_humans', async (req, res) => {
    try {
        const { id, name, species, subspecies, description, date, healthy } = req.body;

        // Check if the ID already exists
        const existing = await db.query('SELECT * FROM authentic_humans WHERE id=$1', [id]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: "ID already exists. Please choose a unique ID." });
        }

        // Insert into authentic_humans table
        const humanResult = await db.query(
            'INSERT INTO authentic_humans(id, name, species, subspecies, description, healthy) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [id, name, species, subspecies, description, healthy]
        );

        // Insert into ah_sightings table
        await db.query(
            'INSERT INTO ah_sightings(id, date) VALUES($1, $2)',
            [id, date]
        );

        res.json(humanResult.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// PUT request -> Update both 'authentic_humans' and 'ah_sightings'
app.put('/authentic_humans/:id', async (req, res) => {
    const id = req.params.id;
    const { name, species, subspecies, description, date, healthy } = req.body;

    try {
        // Update authentic_humans table
        const humanQuery = 'UPDATE authentic_humans SET name=$1, species=$2, subspecies=$3, description=$4, healthy=$5 WHERE id=$6 RETURNING *';
        const humanValues = [name, species, subspecies, description, id, healthy];
        const humanResult = await db.query(humanQuery, humanValues);

        // Update ah_sightings table
        const sightingQuery = 'UPDATE ah_sightings SET date=$1 WHERE id=$2';
        const sightingValues = [date, id];
        await db.query(sightingQuery, sightingValues);

        if (humanResult.rows.length === 0) {
            return res.status(404).json({ error: "Sighting not found" });
        }

        res.send(humanResult.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// DELETE request -> Delete from both 'authentic_humans' and 'ah_sightings'
app.delete('/authentic_humans/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Delete from ah_sightings table
        await db.query('DELETE FROM ah_sightings WHERE id=$1', [id]);

        // Delete from authentic_humans table
        await db.query('DELETE FROM authentic_humans WHERE id=$1', [id]);

        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Vanessa's server is listening on ${PORT}`);
});
 