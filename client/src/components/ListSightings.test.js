import React from 'react';
import { render, screen } from '@testing-library/react';
import ListSightings from './ListSightings';

test('renders ListSightings with form and table headers', () => {
    render(<ListSightings />);

    // Check that the form header is rendered
    expect(screen.getByText(/Have you spotted an endangered species\? Record it here!/i)).toBeInTheDocument();

    // Check that the table headers are rendered - target only the table headers
    const tableHeaders = screen.getAllByRole('columnheader');
    
    // Verify that the expected number of headers is found
    expect(tableHeaders.length).toBe(7);

    // Verify specific headers in the collection
    expect(tableHeaders.map(header => header.textContent)).toEqual(
        expect.arrayContaining(['ID', 'Species', 'Date', 'Location', 'Notes', 'Photo', 'Actions'])
    );
});
