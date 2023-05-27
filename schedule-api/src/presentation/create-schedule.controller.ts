import { CreateScheduleUseCase } from '../application/usecases/create-schedule.usecase';

export class CreateScheduleController {

    constructor(
        private usecase: CreateScheduleUseCase,
    ) {}

    async exec({ id: customerRefId }: { id: string }): Promise<void> {
        try {
            await this.usecase.exec(customerRefId);

        } catch(error) {
            console.log(error);
            //if (error instanceof ApiError) {
            //    return handledError();
            //}

            //return serverError();
        }
    }
}
