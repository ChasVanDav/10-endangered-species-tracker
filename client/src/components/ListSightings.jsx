import React, { useState, useEffect, useReducer } from 'react'; 
import SightingForm from './SightingForm'; 
import SightingCard from './SightingCard'; 
import { searchReducer } from './searchReducer'; 

const ListSightings = () => {
    const [sightings, setSightings] = useState([]);
    const [editingSighting, setEditingSighting] = useState(null);
    const [state, dispatch] = useReducer(searchReducer, { searchTerm: '' });

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

    const onSaveSighting = (newSighting) => {
        setSightings((sightings) => [...sightings, newSighting]);
    };

    const updateSighting = (updatedSighting) => {
        loadSightings();
    };

    const onDelete = (sighting) => {
        fetch(`http://localhost:8080/authentic_humans/${sighting.id}`, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                loadSightings();
            }
        });
    };

    const onUpdate = (toUpdateSighting) => {
        setEditingSighting(toUpdateSighting);
    };

    const handleSearchChange = (event) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value });
    };

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



