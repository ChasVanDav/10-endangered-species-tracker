import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap"; // We're using Bootstrap components for styling

const EventForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {
    // Set up state for the form. If we’re editing an event, start with its data; 
    // otherwise, start with an empty event object.
    const [event, setEvent] = useState(editingEvent || {
        id: "",  // Event ID starts empty (this will be used if editing an existing event)
        species: "",
        subspecies: "",
        name: "",
        description: ""
    });

    // Whenever editingEvent changes (like when we switch to a different event to edit), 
    // update the form fields with the new event data, or reset if no event is passed.
    useEffect(() => {
        setEvent(editingEvent || { id: "", name: "", species: "", subspecies: "", description: "" });
    }, [editingEvent]);

    // These three functions handle updating the form fields when the user types.
    const handleNameChange = (event) => {
        const name = event.target.value; // Get the value the user entered for event name
        setEvent((prevEvent) => ({ ...prevEvent, name })); // Update just the eventname
    };

    const handleSpeciesChange = (event) => {
        const species = event.target.value; 
        setEvent((prevEvent) => ({ ...prevEvent, species })); 
    };

    const handleSubspeciesChange = (event) => {
        const subspecies = event.target.value; // Get the value the user entered for event name
        setEvent((prevEvent) => ({ ...prevEvent, subspecies })); // Update just the eventname
    };

    const handleDescriptionChange = (event) => {
        const description = event.target.value; // Get the location from the input
        setEvent((prevEvent) => ({ ...prevEvent, description })); // Update location in our state
    };

    // This function resets the form to empty fields, clearing the current event.
    const clearForm = () => {
        setEvent({ id: "", name: "", species: "", subspecies: "", description: "" });
    };

    // This function sends a POST request to add a new event to the backend.
    const postEvent = (newEvent) => {
        return fetch("http://localhost:8080/authentic_humans", {
            method: "POST", // Tells the server we want to add something new
            headers: { "Content-Type": "application/json" }, // We're sending JSON data
            body: JSON.stringify(newEvent), // Convert the new event data to JSON
        })
            .then(response => response.json()) // Turn the response into usable data
            .then(data => {
                onSaveEvent(data); // Pass the newly created event back to the parent component
                clearForm(); // Clear the form after saving
            });
    };

    // This function sends a PUT request to update an existing event on the backend.
    const putEvent = (toEditEvent) => {
        return fetch(`http://localhost:8080/authentic_humans/${toEditEvent.id}`, {
            method: "PUT", // Tells the server we want to update something
            headers: { "Content-Type": "application/json" }, // We're sending JSON data
            body: JSON.stringify(toEditEvent), // Convert the event we're editing into JSON
        })
            .then(response => response.json()) // Turn the response into usable data
            .then(data => {
                onUpdateEvent(data); // Let the parent component know we updated an event
                clearForm(); // Clear the form after updating
            });
    };

    // This handles form submission, deciding whether we're adding or updating an event.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from doing a full page reload
        if (event.id) {
            // If the event already has an ID, we're editing it, so we update it.
            putEvent(event);
        } else {
            // If there's no ID, we're adding a brand-new event.
            postEvent(event);
        }
    };

    return (
        <Form className='form-events' onSubmit={handleSubmit}>
            <Form.Group>
                {/* Only show the Event ID field if we are editing an existing event */}
                {event.id && (
                    <>
                        <Form.Label>ID</Form.Label>
                        <input
                            type="text"
                            placeholder="ID"
                            value={event.id}
                            // disabled  // We don't want the user to change the ID
                        />
                    </>
                )}
                {/* Input field for the event name */}
                <Form.Label>Name</Form.Label>
                <input
                    type="text"
                    placeholder="Name"
                    required  // Make sure the user enters something here
                    value={event.name}  // Link this input to the eventname state
                    onChange={handleNameChange}  // Update eventname when the user types
                />
            </Form.Group>
            <Form.Group>
            <Form.Label>Species</Form.Label>
                <input
                    type="text"
                    placeholder="e.g. authentic human"
                    required  // Make sure the user enters something here
                    value={event.species}  // Link this input to the eventname state
                    onChange={handleSpeciesChange}  // Update eventname when the user types
                />
            </Form.Group>
            <Form.Group>
            <Form.Label>Subspecies</Form.Label>
                <input
                    type="text"
                    placeholder="e.g. AUTHENTICALLY GENEROUS"
                    required  // Make sure the user enters something here
                    value={event.subspecies}  // Link this input to the eventname state
                    onChange={handleSubspeciesChange}  // Update eventname when the user types
                />
            </Form.Group>
            <Form.Group>
                {/* Input field for the event location */}
                <Form.Label>Description</Form.Label>
                <input
                    type="text"
                    placeholder="Description"
                    required  // Make sure the user enters a location
                    value={event.description}  // Link this input to the location state
                    onChange={handleDescriptionChange}  // Update location when the user types
                />
            </Form.Group>
            <Form.Group>
                {/* The button text changes based on whether we're adding or editing an event */}
                <Button type="submit" variant="outline-success"
                style={{ padding: '0.6em', backgroundColor: 'bisque', color: 'green'  }}
                >
                    {event.id ? "Edit Sighting" : "Add Sighting"}
                </Button>
                {/* Show the cancel button only when editing an event, to reset the form */}
                {event.id && (
                    <Button type="button" variant="outline-warning" onClick={clearForm}>
                        Cancel
                    </Button>
                )}
            </Form.Group>
        </Form>
    );
};

export default EventForm;


