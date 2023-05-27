import { CreateCustomerUseCase } from '../application/usecases/create-customer.usecase';
import { CustomerRequestDTO } from './customer-http-dto';
import { ApiError } from '../domain/api.error';

export class CustomerController {
    constructor(
        private createCustomerUseCase: CreateCustomerUseCase
    ) {}

    async exec(request: CustomerRequestDTO) {
        try {
            const result = await this.createCustomerUseCase.exec({
                name: request.fullName,
            });

            return result;
        } catch(error) {
            console.log(error);
            //if (error instanceof ApiError) {
            //    return handledError();
            //}

            //return serverError();
        }
    }
}
