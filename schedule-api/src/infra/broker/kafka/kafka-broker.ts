import { Kafka } from 'kafkajs';
import { Broker } from '../broker';

export class KafkaBroker implements Broker {
    private kafka: Kafka;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'microservices',
            brokers: ['kafka_container:9092'],
        });
    }

    async subscribe(topic: string, callback: (...args: any) => any) {
        const consumer = await this.kafka.consumer({ groupId: 'microservices_group' });

        await consumer.subscribe({ topic, fromBeginning: true });
        
        await consumer.run({
            eachMessage: async ({ message }) => {
                await callback(message.value?.toString());
            }
        });
    }
}
