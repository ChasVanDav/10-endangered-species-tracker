// searchReducer.js (no html-like syntax in this code, so it is .js extension)

// Export the searchReducer function so it can be used in ListEvents.jsx

// This function handles changes to the search state. It looks at the action type 
// to figure out what needs to be done and returns the updated state.
export const searchReducer = (state, action) => {
    // We check the type of action that was sent to decide what to do.
    switch (action.type) {
        // If the action is 'SET_SEARCH_TERM', we know we need to update the search term.
        case 'SET_SEARCH_TERM':
            // Here, we're returning a new state object. We copy the current state (...state)
            // and then update only the searchTerm with the new value (action.payload).
            return { ...state, searchTerm: action.payload };

        // If the action type doesn't match anything we know, we just return the current state as is.
        default:
            return state;
    }
};


