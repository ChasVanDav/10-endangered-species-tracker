import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";

const SightingForm = ({ onSaveSighting, editingSighting, onUpdateSighting }) => {
    const [sighting, setSighting] = useState(editingSighting || {
        id: "", 
        species: "",
        subspecies: "",
        name: "",
        description: "",
        //date: ""
    });

    useEffect(() => {
        setSighting(editingSighting || { id: "", name: "", species: "", subspecies: "", description: ""});
    }, [editingSighting]);

    const handleInputChange = (sighting) => {
        const { name, value } = sighting.target;
        setSighting((prevSighting) => ({ ...prevSighting, [name]: value }));
    };

    const clearForm = () => {
        setSighting({ id: "", name: "", species: "", subspecies: "", description: ""});
    };

    const postSighting = (newSighting) => {
        return fetch("http://localhost:8080/authentic_humans", {
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
        return fetch(`http://localhost:8080/authentic_humans/${toEditSighting.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                species: toEditSighting.species,
                subspecies: toEditSighting.subspecies,
                name: toEditSighting.name,
                description: toEditSighting.description
            }),
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
        if (sighting.id) {
            putSighting(sighting);
        } else {
            postSighting(sighting);
        }
    };

    return (
        <Form className='form-sightings' onSubmit={handleSubmit}>
            <Form.Label>Have you spotted an authentic human? log them here!</Form.Label>
            <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control 
                    type="text" 
                    value={sighting.id} 
                    // readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="name" // Use name attribute for handleInputChange
                    value={sighting.name} 
                    onChange={handleInputChange} 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Species</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="species"
                    value="authentic human"
                    //{sighting.species} 
                    // onChange={handleInputChange} 
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Subspecies</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="subspecies"
                    value={sighting.subspecies} 
                    onChange={handleInputChange} 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="description" // Use name attribute for handleInputChange
                    value={sighting.description} 
                    onChange={handleInputChange} 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <input
                    type="date"
                    required
                    name="date" // Use name attribute for handleInputChange
                    value={sighting.date || ""}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {sighting.id ? "Update Sighting" : "Add Sighting"}
            </Button>
            <Button variant="secondary" onClick={clearForm}>
                Cancel
            </Button>
        </Form>
    );
};

export default SightingForm;
