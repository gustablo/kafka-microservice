import { ApiError } from './api.error';

export const emptyDate = () => new ApiError('Empty appointment date');

export const dateLessThanToday = () => new ApiError('Appointment date should not be less than today');
