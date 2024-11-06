import React, { useEffect, useState } from 'react';
import SightingForm from './SightingForm';
import { Table, Button } from 'react-bootstrap';

const ListSightings = () => {
    const [sightings, setSightings] = useState([]);
    const [editingSighting, setEditingSighting] = useState(null);

    useEffect(() => {
        fetchSightings();
    }, []);

    const fetchSightings = () => {
        fetch('http://localhost:8080/sightings')
            .then(response => response.json())
            .then(data => setSightings(data))
            .catch(error => console.error('Error fetching sightings:', error));
    };

    const handleSaveSighting = (newSighting) => {
        setSightings((prevSightings) => [newSighting, ...prevSightings]);
    };

    const handleUpdateSighting = (updatedSighting) => {
        setSightings((prevSightings) => 
            prevSightings.map(sighting => 
                sighting.id === updatedSighting.id ? updatedSighting : sighting
            )
        );
    };

    const handleEditSighting = (sighting) => {
        setEditingSighting(sighting);
    };

    const handleDeleteSighting = (id) => {
        fetch(`http://localhost:8080/sightings/${id}`, { method: 'DELETE' })
            .then(() => {
                setSightings((prevSightings) => prevSightings.filter(sighting => sighting.id !== id));
            })
            .catch(error => console.error('Error deleting sighting:', error));
    };

    const constructPhotoUrl = (photoUrl) => {
        // Location of shareable google endpoint. This may be disabled at some point. Google has disabled most ways to hotlink to their images
        const basePhotoUrl = 'https://lh3.googleusercontent.com/d/';
        
        // Split on ? and & so we can parse the query parameters and get the unique id. If any of object is null set empty array.
        const urlSplit = photoUrl?.split(/[?&]/) ?? [];
        
        for(const value of urlSplit) {
            if (value.startsWith('id')) {
                // This will return endpoint/undefined if this url is malformed/incorrect
                return basePhotoUrl + value.split('=')[1];
            }
        }

        // Return original URL if no ID parameter found
        return photoUrl;
    };

    return (
        <div>
            <SightingForm 
                onSaveSighting={handleSaveSighting} 
                editingSighting={editingSighting} 
                onUpdateSighting={handleUpdateSighting}
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Species</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Notes</th>
                        <th>Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sightings.map(sighting => (
                        <tr key={sighting.id}>
                            <td>{sighting.id}</td>
                            <td>{sighting.species_name}</td>
                            <td>{new Date(sighting.sighting_date).toLocaleDateString()}</td>
                            <td>{sighting.location}</td>
                            <td>{sighting.notes}</td>
                            <td>{sighting.photo_url && <img src={constructPhotoUrl(sighting.photo_url)} alt="photo of endangered animal" style={{ width: '100px' }} />}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditSighting(sighting)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteSighting(sighting.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListSightings;

