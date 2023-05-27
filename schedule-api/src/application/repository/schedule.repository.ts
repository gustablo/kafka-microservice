import { Schedule } from '../../domain/schedule';

export interface ScheduleRepository {
    save(schedule: Schedule): Promise<Schedule>;
}
