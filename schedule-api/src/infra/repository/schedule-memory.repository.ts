import { Schedule } from '../../domain/schedule';
import { ScheduleRepository } from '../../application/repository/schedule.repository';
import { randomUUID } from 'crypto';

export class MemoryScheduleRepository implements ScheduleRepository {

    private schedules: Schedule[] = [];

    async save(schedule: Schedule): Promise<Schedule> {
        const newSchedule = new Schedule({
            id: randomUUID(),
            appointmentDate: schedule.appointmentDate,
            customerRefId: schedule.customerRefId,
        });

        this.schedules.push(newSchedule);

        return newSchedule;
    }
}
