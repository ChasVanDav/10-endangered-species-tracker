import React, { useState, useEffect, useReducer } from 'react'; 
import SightingForm from './SightingForm'; 
import SightingCard from './SightingCard'; 
import { searchReducer } from './searchReducer'; 

const ListSightings = () => {
    const [sightings, setSightings] = useState([]);
    const [editingSighting, setEditingSighting] = useState(null);
    const [state, dispatch] = useReducer(searchReducer, { searchTerm: '' });

    // Load all sightings from the server (including date from ah_sightings)
    const loadSightings = () => {
        fetch("http://localhost:8080/authentic_humans")
            .then(response => response.json())
            .then(sightings => {
                setSightings(sightings);
            });
    };

    useEffect(() => {
        loadSightings();
    }, []);

    // Add new sighting
    const onSaveSighting = (newSighting) => {
        fetch("http://localhost:8080/authentic_humans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSighting), 
        })
        .then(response => response.json())
        .then(savedSighting => {
            setSightings((sightings) => [...sightings, savedSighting]);
        })
        .catch(error => console.error("Error saving sighting:", error));
    };

    // Update existing sighting
    const updateSighting = (updatedSighting) => {
        fetch(`http://localhost:8080/authentic_humans/${updatedSighting.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSighting),
        })
        .then(() => loadSightings()) // Reload sightings after update
        .catch(error => console.error("Error updating sighting:", error));
    };

    // Delete sighting by ID (DELETE request)
    const onDelete = (sighting) => {
        fetch(`http://localhost:8080/authentic_humans/${sighting.id}`, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                loadSightings();
            }
        }).catch(error => console.error("Error deleting sighting:", error));
    };

    // Set a sighting to be edited
    const onUpdate = (toUpdateSighting) => {
        setEditingSighting(toUpdateSighting);
    };

    // Handle search term change
    const handleSearchChange = (event) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value });
    };

    // Filter sightings based on search term
    const filteredSightings = sightings.filter(sighting => 
        sighting.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );

    return (
        <div className="mybody">
            <div className="list-sightings">
                <input 
                    type="text" 
                    placeholder="start typing the name of an authentic human" 
                    value={state.searchTerm} 
                    onChange={handleSearchChange} 
                />
                <div>
                    {filteredSightings.map((sighting) => (
                        <SightingCard 
                            key={sighting.id} 
                            sighting={sighting} 
                            toDelete={onDelete} 
                            toUpdate={onUpdate} 
                        />
                    ))}
                </div>
            </div>
            <SightingForm 
                key={editingSighting ? editingSighting.id : null}
                onSaveSighting={onSaveSighting} 
                editingSighting={editingSighting} 
                onUpdateSighting={updateSighting} 
            />
        </div>
    );
};

export default ListSightings;

