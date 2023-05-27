import { Schedule } from '../../domain/schedule';
import { ScheduleRepository } from '../../application/repository/schedule.repository';
import { ScheduleSchema } from './schedule-schema';

export class ScheduleMongoRepository implements ScheduleRepository {
    
    async save(schedule: Schedule): Promise<Schedule> {
        const createdSchedule = await ScheduleSchema.create({
            appointmentDate: schedule.appointmentDate,
            customerRefId: schedule.customerRefId,
        });

        return new Schedule({
            id: createdSchedule._id.toString(),
            customerRefId: schedule.customerRefId,
            appointmentDate: schedule.appointmentDate,
        });
    }

}
