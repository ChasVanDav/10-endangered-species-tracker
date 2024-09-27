import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";

const SightingForm = ({ onSaveSighting, editingSighting, onUpdateSighting }) => {
    // Initialize state with an empty or editing sighting
    const [sighting, setSighting] = useState(editingSighting || {
        id: "", 
        species: "authentic human", // Predefined species
        subspecies: "",
        name: "",
        date: "",
        healthy: "",
        description: ""
    });

    // Update state when editingSighting changes
    useEffect(() => {
        setSighting(editingSighting || {
        id: "", 
        species: "authentic human", // Predefined species
        subspecies: "",
        name: "",
        date: "",
        healthy: "",
        description: ""
        });
    }, [editingSighting]);

    // Handle input changes for all form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSighting((prevSighting) => ({ ...prevSighting, [name]: value }));
    };

    // Clear the form
    const clearForm = () => {
        setSighting({ id: "", species: "authentic human", subspecies: "", name: "", date: "", healthy: "", description: "" });
    };

    // Handle posting a new sighting
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

    // Handle updating an existing sighting
    const putSighting = (toEditSighting) => {
        return fetch(`http://localhost:8080/authentic_humans/${toEditSighting.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                species: toEditSighting.species,
                subspecies: toEditSighting.subspecies,
                name: toEditSighting.name,
                description: toEditSighting.description,
                date: toEditSighting.date,
                healthy: toEditSighting.healthy
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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (sighting.id) {
            putSighting(sighting); // Update if ID is present
        } else {
            postSighting(sighting); // Otherwise, create a new sighting
        }
    };

    return (
        <Form className='form-sightings' onSubmit={handleSubmit}>
            <Form.Label>Have you spotted an authentic human? Log them here!</Form.Label>
            
            <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control 
                    type="text" 
                    name="id" 
                    value={sighting.id} 
                    onChange={handleInputChange}
                    placeholder="Enter a unique ID"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="name"
                    value={sighting.name} 
                    onChange={handleInputChange} 
                    placeholder="Name of the authentic human"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Species</Form.Label>
                <Form.Control 
                    type="text" 
                    readOnly 
                    name="species"
                    value="authentic human" // Fixed species value
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
                    placeholder="Enter subspecies"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    name="description"
                    value={sighting.description} 
                    onChange={handleInputChange} 
                    placeholder="Provide details of the sighting"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Date</Form.Label>
                <input
                    type="date"
                    required
                    name="date"
                    value={sighting.date}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Healthy</Form.Label>
                <Form.Control 
                    as="select" 
                    name="healthy" 
                    value={sighting.healthy} 
                    onChange={handleInputChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Control>
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

