import React from 'react';
import { render, screen } from '@testing-library/react';
import SightingForm from './SightingForm';

test('renders SightingForm with all required fields and buttons', () => {
    render(<SightingForm />);

    // Check if key form elements are rendered
    expect(screen.getByLabelText(/Species ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Photo URL/i)).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByRole('button', { name: /Add Sighting/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
});
