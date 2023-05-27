import { BrokerMessage } from 'application/broker/broker.message';
import { Broker } from '../../application/broker/broker';
import { Kafka, Producer } from 'kafkajs';

export class BrokerKafa implements Broker {

    private kafka: Kafka | null = null;
    private producer: Producer | null = null;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'microservices',
            brokers: ['kafka_container:9092'],
            retry: {
                initialRetryTime: 300,
                retries: 10
                },
        });
    }

    async connect(): Promise<void> {
        if (!this.kafka) throw Error();

        this.producer = this.kafka.producer({
            allowAutoTopicCreation: true,
        });

        await this.producer.connect();
    }

    async disconnect(): Promise<void> {
        if (!this.producer) throw new Error();

        await this.producer.disconnect();
    }

    async send(message: BrokerMessage, topic: string): Promise<void> {
        if (!this.producer) throw new Error();

        await this.producer.send({
            messages: [{ key: message.key, value: JSON.stringify(message) }],
            topic,
        });
    }

}
