import React, { useState, useEffect, useReducer } from 'react'; 
// We're bringing in some React tools:
// useState: to keep track of simple data
// useEffect: to do things when the component first shows up on the screen
// useReducer: for managing more complex data like the search term
import EventForm from './EventForm'; // The form where users can add or edit events
import EventCard from './EventCard'; // The component that shows individual event details
import { searchReducer } from './searchReducer'; // Our reducer for handling the search functionality

const ListEvents = () => {
    // 'events' is where we store the list of events, starting with an empty list
    // 'setEvents' is how we change that list
    const [events, setEvents] = useState([]);
    
    // 'editingEvent' is for the event we want to edit, if any
    // 'setEditingEvent' lets us update that value
    const [editingEvent, setEditingEvent] = useState(null);
    
    // We use 'useReducer' to manage the search term state with the searchReducer function
    const [state, dispatch] = useReducer(searchReducer, { searchTerm: '' });

    // Function to fetch and load events from the API
    const loadEvents = () => {
        fetch("http://localhost:8080/authentic_humans") // Get data from the API
            .then(response => response.json()) // Turn the response into a JavaScript object
            .then(events => {
                setEvents(events); // Save the events in our state
            });
    };

    // This part runs when the component first appears on the page
    // It calls loadEvents to get the list of events
    useEffect(() => {
        loadEvents();
    }, []); // The empty array means this only happens once, when the component first loads

    // Function to handle saving a new event
    const onSaveEvent = (newEvent) => {
        // Add the new event to the current list of events
        setEvents((events) => [...events, newEvent]);
    };

    // Function to refresh the list after updating an event
    const updateEvent = (updatedEvent) => {
        loadEvents(); // Reload the events list (assuming it's been updated on the server)
    };

    // Function to handle deleting an event
    const onDelete = (event) => {
        fetch(`http://localhost:8080/authentic_humans/${event.id}`, {
            method: "DELETE" // Tells the server to delete the event
        }).then(response => {
            if (response.ok) { // If the server says the deletion worked
                loadEvents(); // Refresh the list of events
            }
        });
    };

    // Function to handle when the user wants to edit an event
    const onUpdate = (toUpdateEvent) => {
        setEditingEvent(toUpdateEvent); // Set the event to be edited in the form
    };

    // Function to update the search term when the user types in the search box
    const handleSearchChange = (event) => {
        // Tell the reducer to update the search term with what the user typed
        dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value });
    };

    // Filter the list of events based on what the user typed in the search box
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );

    

    return (
        <div className="mybody">
            <div className="list-events">
                {/* Input box for searching events by name */}
                <input 
                    type="text" 
                    placeholder="start typing name of an authentic human" 
                    value={state.searchTerm} // The search box shows whatever is in searchTerm
                    onChange={handleSearchChange} // When the user types, update the search term
                />
                <div>
                    {/* Show a list of filtered events (based on the search) */}
                    {filteredEvents.map((event) => (
                        <EventCard 
                            key={event.id} // Give each event a unique key
                            event={event} // Pass the event details to EventCard
                            toDelete={onDelete} // Pass the delete function
                            toUpdate={onUpdate} // Pass the update function
                        />
                    ))}
                </div>
            </div>
            {/* EventForm for adding or editing events */}
            <EventForm 
                key={editingEvent ? editingEvent.id : null} // Pass the current event being edited
                onSaveEvent={onSaveEvent} // Handle saving a new or updated event
                editingEvent={editingEvent} // The event to edit, if any
                onUpdateEvent={updateEvent} // Function to handle updating an event
            />
        </div>
    );
};

export default ListEvents;

