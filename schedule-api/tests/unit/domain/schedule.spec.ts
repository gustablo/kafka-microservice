import { dateLessThanToday, emptyDate } from '../../../src/domain/schedule.error';
import { Schedule } from '../../../src/domain/schedule';

describe('Schedule Domain', () => {
    it('should create an empty schedule', () => {
        const schedule = new Schedule();

        expect(schedule).toBeInstanceOf(Schedule);
        expect(schedule.appointmentDate).toBeFalsy();
        expect(schedule.customerRefId).toBeFalsy();
        expect(schedule.id).toBeFalsy();
    });

    it('should create an fullfilled schedule', () => {
        const schedule = new Schedule({
            id: 'id_test',
            appointmentDate: new Date('2001-09-03'),
            customerRefId: 'customer_ref_id'
        });

        expect(schedule).toBeInstanceOf(Schedule);
        expect(schedule.appointmentDate).toEqual(new Date('2001-09-03'));
        expect(schedule.customerRefId).toBe('customer_ref_id');
        expect(schedule.id).toBe('id_test');
    });

    it ('should validate the appointment date', () => {
        const schedule = new Schedule({
            id: 'id_test',
            appointmentDate: new Date('2001-09-03'),
            customerRefId: 'customer_ref_id'
        });

        expect(() => schedule.isValidSchedule()).toThrowError(dateLessThanToday());

        const emptySchedule = new Schedule();
        expect(() => emptySchedule.isValidSchedule()).toThrowError(emptyDate());
    })
});
