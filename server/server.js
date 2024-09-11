const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/"
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for events in the endpoint '/api/events'
app.get('/api/events', async (req, res) => {
    try {
        const { rows: events } = await db.query('SELECT * FROM events');
        res.send(events);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request
app.post('/api/events', async (req, res) => {
    try {
        const newEvent = {
             eventname: req.body.eventname,
             date: req.body.date,
             location: req.body.location
        };
        console.log([newEvent.eventname, newEvent.date, newEvent.location]);
        const result = await db.query(
            'INSERT INTO events(eventname, date, location) VALUES($1, $2, $3) RETURNING *',
            [newEvent.eventname, newEvent.date, newEvent.location],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for events
app.delete('/api/events/:eventid', async (req, res) => {
    try {
        const eventid = req.params.eventid;
        await db.query('DELETE FROM events WHERE eventid=$1', [eventid]);
        console.log("From the delete request-url", eventid);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update an event 
app.put('/api/events/:eventid', async (req, res) =>{
    console.log(req.params);
    //This will be the id that I want to find in the DB - the event to be updated
    const eventid = req.params.eventid
    const updatedEvent = { eventname: req.body.eventname, date: req.body.date, location: req.body.location}
    console.log("In the server from the url - the event id", eventid);
    console.log("In the server, from the react - the event to be edited", updatedEvent);
    // UPDATE events SET eventname = "something" WHERE eventid="16";
    const query = `UPDATE events SET eventname=$1, date=$2, location=$3 WHERE eventid=${eventid} RETURNING *`;
    const values = [updatedEvent.eventname, updatedEvent.date, updatedEvent.location];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});