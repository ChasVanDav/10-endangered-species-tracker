const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

//----------CRUD OPERATIONS
//Check the back end is set up properly
app.get('/', (req, res) => {
    res.json({ message: 'The backend is up and running...' });
});

// GET request route connected to postgresql
//in 'endangered' db there are two tables 'authentic_humans' and 'ah_sightings'
//join tables to add sightings date to sightings care
app.get('/authentic_humans', async (req, res) => {
    //TO_CHAR to remove the timestamp!!
    //order by name descending!!
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

// POST request
app.post('/authentic_humans', async (req, res) => {
    //had to remove date, while fixing issue since it's from a joined table vis-a-vis temporary therefore cannot do a post request
    try {
        const newSighting = {
            id: req.body.id,
            name: req.body.name,
            species: req.body.species,
            subspecies: req.body.subspecies,
            description: req.body.description
            //date: req.body.date
        };
        console.log([newSighting.name, newSighting.species, newSighting.subspecies, newSighting.description]);
        const result = await db.query(
            'INSERT INTO authentic_humans(name, species, subspecies, description) VALUES($1, $2, $3, $4) RETURNING *',
            [newSighting.name, newSighting.species, newSighting.subspecies, newSighting.description],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// DELETE request
app.delete('/authentic_humans/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM authentic_humans WHERE id=$1', [id]);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// PUT request --> updating an existing sighting
app.put('/authentic_humans/:id', async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const updatedSighting = { name: req.body.name, species: req.body.species, subspecies: req.body.subspecies, description: req.body.description };
    const query = `UPDATE authentic_humans SET name=$1, species=$2, subspecies=$3, description=$4 WHERE id=${id} RETURNING *`;
    const values = [updatedSighting.name, updatedSighting.species, updatedSighting.subspecies, updatedSighting.description];
    try {
        const updated = await db.query(query, values);
        res.send(updated.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

app.listen(PORT, () => {
    console.log(`Vanessa's server is listening on ${PORT}`);
});
