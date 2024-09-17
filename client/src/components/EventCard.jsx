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
                <Card.Title>{event.eventname}</Card.Title>
                {/* Show the event's ID */}
                <Card.Text>
                    Event ID: {event.eventid}
                </Card.Text>
                {/* Show the event's date */}
                <Card.Text>
                    Date: {event.date}
                </Card.Text>
                {/* Show the event's location */}
                <Card.Text>
                    Location: {event.location}
                </Card.Text>
                {/* Button to delete the event */}
                <Button 
                    variant="outline-danger" // Red outline button for deleting the event
                    onClick={() => onDelete(event)} // When clicked, it calls the onDelete function
                    style={{ padding: '0.6em', marginRight: '0.9em' }}>
                    <ioicons.IoTrash /> {/* Trash icon to represent deleting */}
                </Button>
                {/* Button to update (edit) the event */}
                <Button 
                    variant="outline-info" // Blue outline button for editing the event
                    onClick={() => onUpdate(event)} // When clicked, it calls the onUpdate function
                    style={{ padding: '0.6em' }}>
                    <ioicons.IoSync /> {/* Sync icon to represent updating */}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;

