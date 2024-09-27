import React from 'react';
import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button'; 
import * as ioicons from 'react-icons/io5'; 

const SightingCard = ({ sighting, toUpdate, toDelete }) => {
    // Function to handle updating a sighting, calls the toUpdate function passed in from the parent
    const onUpdate = (toUpdateSighting) => {
        toUpdate(toUpdateSighting); // This tells the parent component we want to edit this sighting
    };

    // Function to handle deleting a sighting, calls the toDelete function passed in from the parent
    const onDelete = (toDeleteSighting) => {
        toDelete(toDeleteSighting); // This tells the parent component to delete this sighting
    };

    return (
        <Card>
            <Card.Body>
                {/* Display the name of the authentic human */}
                <Card.Title>{sighting.name}</Card.Title>
                
                {/* Display the user-defined ID */}
                <Card.Text>
                   ID: {sighting.id}
                </Card.Text>

                {/* Display the species and subspecies */}
                <Card.Text>
                   Species: {sighting.species}
                </Card.Text>
                <Card.Text>
                   Subspecies: {sighting.subspecies}
                </Card.Text>

                {/* Display the sighting date from the `ah_sightings` table */}
                <Card.Text>
                   Initial sighting: {sighting.date}
                </Card.Text>

                {/* Display the healthy status */}
                <Card.Text>
                    Healthy: {sighting.healthy ? "Yes" : "No"}
                </Card.Text>

                {/* Display the description */}
                <Card.Text>
                {sighting.name} {sighting.description} 
                </Card.Text>

                {/* Button for deleting the sighting */}
                <Button 
                    variant="outline-danger" // Red outline button for deleting the sighting
                    onClick={() => onDelete(sighting)} // When clicked, it calls the onDelete function
                    style={{ padding: '0.6em', marginRight: '0.9em', backgroundColor: 'bisque' }}>
                    <ioicons.IoTrash /> {/* Trash icon to represent deleting */}
                </Button>
                
                {/* Button for updating (editing) the sighting */}
                <Button 
                    variant="outline-info" // Blue outline button for editing the sighting
                    onClick={() => onUpdate(sighting)} // When clicked, it calls the onUpdate function
                    style={{ padding: '0.6em', backgroundColor: 'bisque', color: 'green' }}>
                    <ioicons.IoSync /> {/* Sync icon to represent updating */}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default SightingCard;



