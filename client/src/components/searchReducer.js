export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.payload
            };
        case 'SET_SPECIES_FILTER':
            return {
                ...state,
                speciesFilter: action.payload
            };
        default:
            return state;
    }
};


