import { Customer } from '../../domain/customer';
import { emptyName } from '../../domain/customer.error';
import { Broker } from '../broker/broker';
import { BrokerMessage } from '../broker/broker.message';
import { CustomerRepository } from '../repository/customer.repository';

export class CreateCustomerUseCase {

    constructor(
        private customerRepository: CustomerRepository,
        private broker: Broker,
    ) {}

    async exec(customer: Customer): Promise<Customer> {
        if (!customer.name) {
            throw emptyName();
        }

        const createdCustomer = await this.customerRepository.save(customer);

        if (createdCustomer) await this.communicateCustomerCreated(createdCustomer);

        return createdCustomer;
    }

    async communicateCustomerCreated(customer: Customer) {
        await this.broker.connect();

        const topic = 'customer.created';
        const message: BrokerMessage = {
            key: 'customer_created',
            value: JSON.stringify(customer),
        };

        await this.broker.send(message, topic);

        await this.broker.disconnect();
    }
}
