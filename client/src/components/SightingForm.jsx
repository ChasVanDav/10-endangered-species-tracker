import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";

const SightingForm = ({ onSaveSighting, editingSighting, onUpdateSighting }) => {
    const [sighting, setSighting] = useState(editingSighting || {
        species_id: "",
        sighting_date: "",
        location: "",
        notes: "",
        photo_url: ""
    });

    useEffect(() => {
        setSighting(editingSighting || {
            species_id: "",
            sighting_date: "",
            location: "",
            notes: "",
            photo_url: ""
        });
    }, [editingSighting]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSighting((prevSighting) => ({ ...prevSighting, [name]: value }));
    };

    const clearForm = () => {
        setSighting({ species_id: "", sighting_date: "", location: "", notes: "", photo_url: "" });
    };

    const postSighting = (newSighting) => {
        return fetch("http://localhost:8080/sightings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSighting),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                onSaveSighting(data);
                clearForm();
            })
            .catch(error => {
                console.error("Error posting sighting:", error);
            });
    };

    const putSighting = (toEditSighting) => {
        return fetch(`http://localhost:8080/sightings/${toEditSighting.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditSighting),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                onUpdateSighting(data);
                clearForm();
            })
            .catch(error => {
                console.error("Error updating sighting:", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSighting) {
            putSighting(sighting); // Only send the sighting object without id if editing
        } else {
            postSighting(sighting); // No id should be sent for new sightings
        }
    };

    return (
        <Form className='form-sightings' onSubmit={handleSubmit}>
            <Form.Label>Have you spotted an endangered species? Record it here!</Form.Label>
            <Form.Label>Species ID</Form.Label><br></br>
            <Form.Label>1 = authentic_humans</Form.Label><br></br>
            <Form.Label>2 = cuddly_mammals</Form.Label><br></br>
            <Form.Label>3 = necessary_insects</Form.Label>
            <Form.Group>
                <Form.Label>Species ID</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="species_id"
                    value={sighting.species_id} 
                    onChange={handleInputChange} 
                    placeholder="Enter species ID"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Date</Form.Label>
                <input
                    type="date"
                    required
                    name="sighting_date"
                    value={sighting.sighting_date}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="location"
                    value={sighting.location} 
                    onChange={handleInputChange} 
                    placeholder="Enter location of sighting"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="notes"
                    value={sighting.notes} 
                    onChange={handleInputChange} 
                    placeholder="Additional notes"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Photo URL</Form.Label>
                <Form.Control 
                    type="text" 
                    name="photo_url"
                    value={sighting.photo_url} 
                    onChange={handleInputChange} 
                    placeholder="Optional photo URL"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {editingSighting ? "Update Sighting" : "Add Sighting"}
            </Button>
            
            <Button variant="secondary" onClick={clearForm}>
                Cancel
            </Button>
        </Form>
    );
};

export default SightingForm;