import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db-connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

//----------CRUD OPERATIONS

// Check if the backend is up
app.get('/', (req, res) => {
    res.json({ message: 'The backend is up and running...' });
});

// ------------------- Species Routes -------------------

// GET all species
app.get('/species', async (req, res) => {
    try {
        const query = 'SELECT * FROM species ORDER BY name';
        const { rows: species } = await db.query(query);
        res.json(species);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// POST a new species
app.post('/species', async (req, res) => {
    const { name, description, population_estimate } = req.body;
    try {
        const query = 'INSERT INTO species(name, description, population_estimate) VALUES($1, $2, $3) RETURNING *';
        const { rows } = await db.query(query, [name, description, population_estimate]);
        res.json(rows[0]);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// ------------------- Sightings Routes -------------------

// GET all sightings with species name
app.get('/sightings', async (req, res) => {
    try {
        const query = `
            SELECT s.*, sp.name AS species_name 
            FROM sightings AS s 
            JOIN species AS sp ON s.species_id = sp.id 
            ORDER BY s.sighting_date DESC;
        `;
        const { rows: sightings } = await db.query(query);
        res.json(sightings);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// POST a new sighting
app.post('/sightings', async (req, res) => {
    const { species_id, sighting_date, location, notes, photo_url } = req.body;
    try {
        const query = `
            INSERT INTO sightings(species_id, sighting_date, location, notes, photo_url) 
            VALUES($1, $2, $3, $4, $5) RETURNING *;
        `;
        const { rows } = await db.query(query, [species_id, sighting_date, location, notes, photo_url]);

        res.status(201).json(rows[0]);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// PUT to update a sighting
app.put('/sightings/:id', async (req, res) => {
    const { id } = req.params;
    const { species_id, sighting_date, location, notes, photo_url } = req.body;

    try {
        const query = `
            UPDATE sightings 
            SET species_id = $1, sighting_date = $2, location = $3, notes = $4, photo_url = $5 
            WHERE id = $6 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [species_id, sighting_date, location, notes, photo_url, id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Sighting not found" });
        }

        res.json(rows[0]);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// DELETE a sighting
app.delete('/sightings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM sightings WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Sighting not found" });
        }

        res.status(204).end(); // No content to send back
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// Export the app and a function to start the server
const startServer = () => {
    const server = app.listen(8080, () => {
        console.log('Server is listening on 8080');
    });
    return { app, server };
};

export default startServer;