import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap"; // We're using Bootstrap components for styling

const EventForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {
    // Set up state for the form. If we’re editing an event, start with its data; 
    // otherwise, start with an empty event object.
    const [event, setEvent] = useState(editingEvent || {
        eventid: "",  // Event ID starts empty (this will be used if editing an existing event)
        eventname: "",
        date: "",
        location: ""
    });

    // Whenever editingEvent changes (like when we switch to a different event to edit), 
    // update the form fields with the new event data, or reset if no event is passed.
    useEffect(() => {
        setEvent(editingEvent || { eventid: "", eventname: "", date: "", location: "" });
    }, [editingEvent]);

    // These three functions handle updating the form fields when the user types.
    const handleNameChange = (event) => {
        const eventname = event.target.value; // Get the value the user entered for event name
        setEvent((prevEvent) => ({ ...prevEvent, eventname })); // Update just the eventname
    };

    const handleDateChange = (event) => {
        const date = event.target.value; // Get the date value from the input
        setEvent((prevEvent) => ({ ...prevEvent, date })); // Update the date in our state
    };

    const handleLocationChange = (event) => {
        const location = event.target.value; // Get the location from the input
        setEvent((prevEvent) => ({ ...prevEvent, location })); // Update location in our state
    };

    // This function resets the form to empty fields, clearing the current event.
    const clearForm = () => {
        setEvent({ eventid: "", eventname: "", date: "", location: "" });
    };

    // This function sends a POST request to add a new event to the backend.
    const postEvent = (newEvent) => {
        return fetch("http://localhost:8080/api/events", {
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
        return fetch(`http://localhost:8080/api/events/${toEditEvent.eventid}`, {
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
        if (event.eventid) {
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
                {event.eventid && (
                    <>
                        <Form.Label>Event ID</Form.Label>
                        <input
                            type="text"
                            placeholder="Event ID"
                            value={event.eventid}
                            disabled  // We don't want the user to change the ID
                        />
                    </>
                )}
                {/* Input field for the event name */}
                <Form.Label>Event Name</Form.Label>
                <input
                    type="text"
                    placeholder="Event Name"
                    required  // Make sure the user enters something here
                    value={event.eventname}  // Link this input to the eventname state
                    onChange={handleNameChange}  // Update eventname when the user types
                />
            </Form.Group>
            <Form.Group>
                {/* Input field for the event date */}
                <Form.Label>Date</Form.Label>
                <input
                    type="date"
                    placeholder="Date"
                    required  // Make sure the user picks a date
                    value={event.date}  // Link this input to the date state
                    onChange={handleDateChange}  // Update the date when the user picks a new one
                />
            </Form.Group>
            <Form.Group>
                {/* Input field for the event location */}
                <Form.Label>Location</Form.Label>
                <input
                    type="text"
                    placeholder="Location"
                    required  // Make sure the user enters a location
                    value={event.location}  // Link this input to the location state
                    onChange={handleLocationChange}  // Update location when the user types
                />
            </Form.Group>
            <Form.Group>
                {/* The button text changes based on whether we're adding or editing an event */}
                <Button type="submit" variant="outline-success">
                    {event.eventid ? "Edit Event" : "Add Event"}
                </Button>
                {/* Show the cancel button only when editing an event, to reset the form */}
                {event.eventid && (
                    <Button type="button" variant="outline-warning" onClick={clearForm}>
                        Cancel
                    </Button>
                )}
            </Form.Group>
        </Form>
    );
};

export default EventForm;


