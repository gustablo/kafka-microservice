import { CustomerRepository } from '../../../../src/application/repository/customer.repository';
import { Customer } from '../../../../src/domain/customer';
import { randomUUID } from 'crypto';

export class CustomerMemoryRepository implements CustomerRepository {
    private customers: Customer[] = [];

    async save(customer: Customer): Promise<Customer> {
        this.customers.push(customer);

        return new Customer({
            id: randomUUID(),
            ...customer,
        });
    }
}
