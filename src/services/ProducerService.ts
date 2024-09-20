import { inject, injectable } from 'tsyringe';
import { ProducerRepository } from '../repositories/ProducerRepository';
import { Producer } from '../infra/models/Producer';

@injectable()
export class ProducerService {
    constructor(
        @inject('ProducerRepository') private producerRepository: ProducerRepository
    ) {}

    public async createProducer(producer: Producer): Promise<Producer> {
        return await this.producerRepository.createProducer(producer);
    }

    public async updateProducer(id: number, producer: Producer): Promise<Producer | null> {
        return await this.producerRepository.updateProducer(id, producer);
    }

    public async deleteProducer(id: number): Promise<Producer | null> {
        return await this.producerRepository.deleteProducer(id);
    }

    public async getProducerById(id: number): Promise<Producer | null> {
        return await this.producerRepository.getProducerById(id);
    }

    public async getAllProducers(): Promise<Producer[]> {
        return await this.producerRepository.getAllProducers();
    }

    public async getDashboardTotals() {
        return await this.producerRepository.getDashboardTotals();
    }
}
