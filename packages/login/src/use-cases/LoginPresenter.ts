import { LoginResponse } from './LoginResponse';

export interface LoginPresenter {
  presentResponse(response: LoginResponse): void;
}
