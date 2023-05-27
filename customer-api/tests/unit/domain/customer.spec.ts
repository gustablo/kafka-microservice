import { Customer } from "../../../src/domain/customer";

describe('Customer Domain', () => {

    it('should create an empty customer', () => {
        const customer = new Customer();

        expect(customer.name).toBeFalsy();
        expect(customer.id).toBeFalsy();
        expect(customer).toBeInstanceOf(Customer);
    });

    it('should create an filled user without id', () => {
        const customer = new Customer({
            name: 'name_test',
        });

        expect(customer.name).toBe('name_test');
        expect(customer.id).toBeFalsy();
        expect(customer).toBeInstanceOf(Customer); 
    });

    it('should create an filled user', () => {
        const customer = new Customer({
            id: 'id_test',
            name: 'name_test',
        });

        expect(customer.name).toBe('name_test');
        expect(customer.id).toBe('id_test');
        expect(customer).toBeInstanceOf(Customer); 
    });

    it 
});
