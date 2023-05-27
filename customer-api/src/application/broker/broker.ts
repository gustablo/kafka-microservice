import { BrokerMessage } from "./broker.message";

export interface Broker {
    connect(): Promise<void>;
    disconnect(): Promise<void>;

    send(message: BrokerMessage, topic: string): Promise<void>;
}
