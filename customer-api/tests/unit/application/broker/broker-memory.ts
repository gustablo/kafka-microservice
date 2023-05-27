import { Broker } from '../../../../src/application/broker/broker';
import { BrokerMessage } from '../../../../src/application/broker/broker.message';

export class BrokerMemory implements Broker {

    private connected = false;

    async connect(): Promise<void> {
        this.connected = true;
    }

    async disconnect(): Promise<void> {
        if (!this.connected) throw Error();
    }

    async send(message: BrokerMessage, topic: string): Promise<void> {
        if (!this.connected) throw Error();
    }


}