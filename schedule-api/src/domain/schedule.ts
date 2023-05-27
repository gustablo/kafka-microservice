import { Props } from './props';
import { dateLessThanToday, emptyDate } from './schedule.error';

export class Schedule {
    id?: string;

    customerRefId: string = '';
    appointmentDate: Date | null = null;

    constructor(schedule?: Props<Schedule>) {
        Object.assign(this, schedule);
    }

    isValidSchedule() {
        if (!this.appointmentDate) throw emptyDate();

        if (this.appointmentDate < new Date()) throw dateLessThanToday();
    }
}
