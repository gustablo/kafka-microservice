export interface Broker {
    subscribe(topic: string, callback: (...args: any) => any): Promise<any>;
}
