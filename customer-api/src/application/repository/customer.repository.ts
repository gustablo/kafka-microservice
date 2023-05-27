import { Customer } from '../../domain/customer';

export interface CustomerRepository {
    save(customer: Customer): Promise<Customer>;
}
