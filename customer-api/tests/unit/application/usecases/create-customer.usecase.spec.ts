import { CreateCustomerUseCase } from '../../../../src/application/usecases/create-customer.usecase';
import { Customer } from '../../../../src/domain/customer';
import { emptyName } from '../../../../src/domain/customer.error';
import { BrokerMemory } from '../broker/broker-memory';
import { CustomerMemoryRepository } from '../repository/customer-memory.repository';

beforeEach(() => jest.clearAllMocks());

describe('Create Customer UseCase', () => {
    const repository = new CustomerMemoryRepository();
    const broker = new BrokerMemory();
    const usecase = new CreateCustomerUseCase(repository, broker);
    
    const spyCommunicate = jest.spyOn(usecase, 'communicateCustomerCreated');
    const spyRepository = jest.spyOn(repository, 'save');
    const spyBrokerSend = jest.spyOn(broker, 'send');
    const spyBrokerConnect = jest.spyOn(broker, 'connect');
    const spyBrokerDisconnect = jest.spyOn(broker, 'disconnect');

    it ('should create a customer', async () => {
        const customer = new Customer({
            name: 'name_test',
        });

        const response = await usecase.exec(customer);

        expect(response).toBeInstanceOf(Customer);
        expect(response).toHaveProperty('id');
        expect(response.name).toBe('name_test');

        expect(spyRepository).toHaveBeenCalledTimes(1);
        expect(spyRepository).toHaveBeenCalledWith(customer);

        expect(spyCommunicate).toHaveBeenCalledTimes(1);
        expect(spyCommunicate).toHaveBeenCalledWith(response);
    });

    it ('should throw an error when send an empty name', async () => {
        const customer = new Customer();

        expect(usecase.exec(customer)).rejects.toThrowError(emptyName());

        expect(spyRepository).toHaveBeenCalledTimes(0);
        expect(spyBrokerSend).toHaveBeenCalledTimes(0);
    });

    it ('should communicate to broker that a customer was created', async () => {
        const customer = new Customer({
            name: 'name_test',
            id: 'id_test',
        });

        await usecase.communicateCustomerCreated(customer);

        expect(spyBrokerConnect).toHaveBeenCalledTimes(1);

        expect(spyBrokerSend).toHaveBeenCalledTimes(1);
        expect(spyBrokerSend).toHaveBeenCalledWith({ key: 'customer_created', value: JSON.stringify(customer) }, 'customer.created');
        
        expect(spyBrokerDisconnect).toHaveBeenCalledTimes(1);
    });

});
