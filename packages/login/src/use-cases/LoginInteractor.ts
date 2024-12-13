import { LoginRequest } from './LoginRequest';

export const LOGIN_FAILURE_MESSAGE = 'Invalid Login';
export const LOGIN_SUCCESS_MESSAGE = 'Welcome';

export interface LoginInteractor {
  login(request: LoginRequest): void;
}
