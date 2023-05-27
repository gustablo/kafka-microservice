import { ApiError } from './api.error';

export const emptyName = () => new ApiError('Name cannot be empty');
