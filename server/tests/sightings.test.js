import request from 'supertest';
import app from '../app';

describe('Sightings API', () => {
    it('should create a new sighting', async () => {
        const newSighting = {
            species_id: '1',
            sighting_date: '2024-11-01',
            location: 'Somewhere',
            notes: 'Saw an authentic human!',
            photo_url: 'http://example.com/photo.jpg'
        };

        const response = await request(app)
            .post('/sightings')
            .send(newSighting)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.species_id).toBe(newSighting.species_id);
    });

    it('should return all sightings', async () => {
        const response = await request(app)
            .get('/sightings')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});
