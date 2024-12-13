import { LoginPresenter } from '../../use-cases/LoginPresenter';
import { LoginResponse } from '../../use-cases/LoginResponse';

export class LoginPresenterSpy implements LoginPresenter {
  private invokedResponse: LoginResponse | null = null;

  presentResponse(response: LoginResponse) {
    this.invokedResponse = response;
  }

  getInvokedResponse(): LoginResponse | null {
    return this.invokedResponse;
  }
}
