const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'The backend is up and running...' });
});

//GET request route
app.get('/authentic_humans', async (req, res) => {
    try {

        const query = `
        SELECT ah.*, TO_CHAR(asg.date, 'YYYY-MM-DD') AS date 
        FROM authentic_humans AS ah
        LEFT JOIN ah_sightings AS asg ON ah.id = asg.id
    `;

        const { rows: events } = await db.query(query);
        res.send(events);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// POST request
app.post('/authentic_humans', async (req, res) => {
    try {
        const newEvent = {
             name: req.body.name,
             species: req.body.species,
             subspecies: req.body.subspecies,
             description: req.body.description,
             date: req.body.date
        };
        console.log([newEvent.name, newEvent.species, newEvent.subspecies, newEvent.date, newEvent.description]);
        const result = await db.query(
            //adding a new event in the database and return all events
            'INSERT INTO authentic_humans(name, species, subspecies, date, description) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [newEvent.name, newEvent.species, newEvent.subspecies, newEvent.date, newEvent.description],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// DELETE request  --> deleting an event (*stretch goal is adding an "are you sure?" pop up)
app.delete('/authentic_humans/:id', async (req, res) => {
    try {
        const id = req.params.id;
        //remove from database
        await db.query('DELETE FROM authentic_humans WHERE id=$1', [id]);
        console.log("From the delete request-url", id);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//PUT request --> updating an existing event 
app.put('/authentic_humans/:id', async (req, res) =>{
    console.log(req.params);
    //This will be the id that I want to find in the DB - the event to be updated
    const id = req.params.id
    const updatedEvent = { name: req.body.name, species: req.body.species, subspecies: req.body.subspecies, date: req.body.date, description: req.body.description}
    // UPDATE events SET eventname = "something" WHERE eventid="16";
    const query = `UPDATE authentic_humans SET name=$1, species=$2, subspecies=$3, description=$4 WHERE id=${id} RETURNING *`;
    const values = [updatedEvent.name, updatedEvent.species, updatedEvent.subspecies, updatedEvent.date, updatedEvent.description];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  //******stretch goal --> put in order by id or date
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })


app.listen(PORT, () => {
    console.log(`Vanessa's server is listening on ${PORT}`);
});