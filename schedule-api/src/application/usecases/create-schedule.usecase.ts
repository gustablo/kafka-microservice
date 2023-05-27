import { ScheduleRepository } from '../../application/repository/schedule.repository';
import { Schedule } from '../../domain/schedule';

export class CreateScheduleUseCase {
    constructor(
        private repository: ScheduleRepository
    ) {}

    async exec(customerRefId: string): Promise<Schedule> {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        const scheduleToCreate = new Schedule({
            customerRefId,
            appointmentDate: date,
        });

        const schedule = await this.repository.save(scheduleToCreate);

        console.log('saved schedule', schedule);

        return schedule;
    }
}
