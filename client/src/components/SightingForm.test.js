import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SightingForm from './SightingForm';

test('renders SightingForm and submits a new sighting', () => {
    const mockOnSaveSighting = jest.fn();
    render(<SightingForm onSaveSighting={mockOnSaveSighting} />);

    // Check if form elements are rendered
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Photo URL/i)).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'Somewhere' } });
    fireEvent.change(screen.getByLabelText(/Notes/i), { target: { value: 'Saw something amazing!' } });

    // Simulate form submission
    fireEvent.submit(screen.getByRole('button', { name: /Add Sighting/i }));

    expect(mockOnSaveSighting).toHaveBeenCalled();
});
