import { CustomerRepository } from '../../application/repository/customer.repository';
import { Customer } from '../../domain/customer';
import { CustomerSchema } from './customer-schema.repository';

export class MongoCustomerRepository  implements CustomerRepository {
    async save(customer: Customer): Promise<Customer> {
        const createdCustomer = await CustomerSchema.create({
           name: customer.name, 
        });

        return new Customer({
            id: createdCustomer._id.toString(),
            name: createdCustomer.name,
        });
    }
}
