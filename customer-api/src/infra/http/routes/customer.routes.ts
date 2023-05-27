import { CreateCustomerUseCase } from '../../../application/usecases/create-customer.usecase';
import { Router } from 'express';
import { BrokerKafa } from '../../kafka/broker-kafka';
import { MongoCustomerRepository } from '../../mongodb/customer.repository';
import { CustomerController } from '../../../presentation/create-customer.controller';

const routes = Router();

routes.post('/customers', async (req, res) => {
    const repository = new MongoCustomerRepository();
    const broker = new BrokerKafa();
    const usecase = new CreateCustomerUseCase(repository, broker);
    const controller = new CustomerController(usecase);

    const result = await controller.exec(req.body);

    return res.send(result).status(200);
})

export { routes };

