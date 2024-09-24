import React from 'react';
import Card from 'react-bootstrap/Card'; // We're using Bootstrap's Card component to display event info
import Button from 'react-bootstrap/Button'; // Bootstrap buttons for actions like deleting or editing
import * as ioicons from 'react-icons/io5'; // Importing icons from react-icons for the buttons

const EventCard = ({ event, toUpdate, toDelete }) => {
    // Function to handle updating an event, calls the toUpdate function passed in from the parent
    const onUpdate = (toUpdateEvent) => {
        toUpdate(toUpdateEvent); // This tells the parent component we want to edit this event
    };

    // Function to handle deleting an event, calls the toDelete function passed in from the parent
    const onDelete = (toDeleteEvent) => {
        toDelete(toDeleteEvent); // This tells the parent component to delete this event
    };

    return (
        <Card>
            <Card.Body>
                {/* Display the event's name as the title */}
                <Card.Title>{event.name}</Card.Title>
                {/* Show the event's ID */}
                <Card.Text>
                   Initial sighting: {event.date}
                </Card.Text>
                <Card.Text>
                   ID: {event.id}
                </Card.Text>
                <Card.Text>
                   Species: {event.species}
                </Card.Text>
                <Card.Text>
                   Subspecies: {event.subspecies}
                </Card.Text>
                {/* Show the event's location */}
                <Card.Text>
                    {event.description}
                </Card.Text>
                {/* Button to delete the event */}
                <Button 
                    variant="outline-danger" // Red outline button for deleting the event
                    onClick={() => onDelete(event)} // When clicked, it calls the onDelete function
                    style={{ padding: '0.6em', marginRight: '0.9em', backgroundColor: 'bisque' }}>
                    <ioicons.IoTrash /> {/* Trash icon to represent deleting */}
                </Button>
                {/* Button to update (edit) the event */}
                <Button 
                    variant="outline-info" // Blue outline button for editing the event
                    onClick={() => onUpdate(event)} // When clicked, it calls the onUpdate function
                    style={{ padding: '0.6em', backgroundColor: 'bisque', color: 'green'  }}>
                    <ioicons.IoSync /> {/* Sync icon to represent updating */}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;

