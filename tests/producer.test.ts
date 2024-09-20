import request from 'supertest';
import { App } from '../src/app'; // Ajuste o caminho conforme necessário

const app = new App();

describe('Producers API', () => {
    let producerId: number;

    it('should create a new producer', async () => {
        const response = await request(app['app']) 
            .post('/api/producers')
            .send({
                cpfCnpj: '12345678901', 
                name: 'John Doe',
                farmName: 'Farm A',
                city: 'City A',
                state: 'State A',
                totalArea: 100,
                arableArea: 70,
                vegetationArea: 30,
                plantedCrops: ['Soja', 'Milho']
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        producerId = response.body.id; 
    });

    it('should retrieve a producer by ID', async () => {
        const response = await request(app['app']).get(`/api/producers/${producerId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', producerId);
    });

    it('should update a producer', async () => {
        const response = await request(app['app'])
            .put(`/api/producers/${producerId}`)
            .send({
                name: 'John Updated',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'John Updated');
    });

    it('should delete a producer', async () => {
        const response = await request(app['app']).delete(`/api/producers/${producerId}`);

        expect(response.status).toBe(204); 
    });
});
