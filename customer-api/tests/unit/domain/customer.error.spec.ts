import { ApiError } from '../../../src/domain/api.error';
import { emptyName } from '../../../src/domain/customer.error';

describe('Customer Error', () => {
    it('should return APIError Object', () => {
        const error = emptyName();

        expect(error).toBeInstanceOf(ApiError);
        expect(error.message).toBe('Name cannot be empty');
    });
});
