import { CreateScheduleUseCase } from '../../../../src/application/usecases/create-schedule.usecase';
import { Schedule } from '../../../../src/domain/schedule';
import { MemoryScheduleRepository } from '../../../../src/infra/repository/schedule-memory.repository';

beforeEach(() => jest.clearAllMocks());

describe('Create Schedule Usecase', () => {
    const repository = new MemoryScheduleRepository();
    const usecase = new CreateScheduleUseCase(repository);
    const spyRepository = jest.spyOn(repository, 'save');

    it ('should create an appointment to tomorrow' , async () => {
        const params = 'ref_id_test'

        const result = await usecase.exec(params);

        const date = new Date();
        date.setDate(date.getDate() + 1);
    
        expect(result.id).toBeTruthy();
        expect(result.customerRefId).toBe('ref_id_test');
        expect(result.appointmentDate!.setHours(0,0,0,0)).toEqual(date.setHours(0,0,0,0));
        expect(spyRepository).toBeCalledTimes(1);
        expect(spyRepository).toBeCalledWith(new Schedule({
            customerRefId: 'ref_id_test',
            appointmentDate: date,
        }));
    });
});
