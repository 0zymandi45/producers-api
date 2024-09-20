import { injectable } from 'tsyringe';
import AppDataSource  from '../infra/database/index'; 
import { Producer } from '../infra/models/Producer';
import logger from '../utils/logger';

@injectable()
export class ProducerRepository {
    private producerRepository = AppDataSource.getRepository(Producer);

    public async createProducer(producer: Producer): Promise<Producer> {
        const newProducer = this.producerRepository.create(producer);
        logger.info('Saving new producer:', newProducer);
        return await this.producerRepository.save(newProducer);
    }

    public async updateProducer(id: number, producer: Producer): Promise<Producer | null> {
        await this.producerRepository.update(id, producer);
        return await this.producerRepository.findOneBy({ id });
    }

    public async deleteProducer(id: number): Promise<Producer | null> {
        const producer = await this.producerRepository.findOneBy({ id });
        await this.producerRepository.delete(id);
        return producer;
    }

    public async getProducerById(id: number): Promise<Producer | null> {
        return await this.producerRepository.findOneBy({ id });
    }

    public async getAllProducers(): Promise<Producer[]> {
        return await this.producerRepository.find();
    }

    public async getDashboardTotals() {
        const totalFarms = await this.producerRepository.count();
        const totalArea = await this.producerRepository.createQueryBuilder('producer')
            .select('SUM(producer.totalArea)', 'totalArea')
            .getRawOne();

        const totalByState = await this.producerRepository.createQueryBuilder('producer')
            .select('producer.state, COUNT(*) AS count')
            .groupBy('producer.state')
            .getRawMany();

        const totalByCrop = await this.producerRepository.createQueryBuilder('producer')
            .select('UNNEST(producer.crops) AS crop, COUNT(*) AS count')
            .groupBy('crop')
            .getRawMany();

        return {
            totalFarms,
            totalArea: parseFloat(totalArea.totalArea),
            totalByState,
            totalByCrop,
        };
    }
}
