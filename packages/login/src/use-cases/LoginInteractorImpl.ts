import { LOGIN_FAILURE_MESSAGE, LOGIN_SUCCESS_MESSAGE, LoginInteractor } from './LoginInteractor';
import { LoginRequest } from './LoginRequest';
import { Authorizer } from '../authorizer/Authorizer';
import { UserGateway } from './UserGateway';
import { LoginPresenter } from './LoginPresenter';
import { LoginResponse } from './LoginResponse';

export class LoginInteractorImpl implements LoginInteractor {
  private authorizer: Authorizer | null = null;
  private userGateway: UserGateway | null = null;
  private presenter: LoginPresenter | null = null;
  private loginAttemptCounter = new Map<string, number>();

  public setAuthorizer(authorizer: Authorizer): void {
    this.authorizer = authorizer;
  }

  public setUserGateway(userGateway: UserGateway): void {
    this.userGateway = userGateway;
  }

  public setPresenter(presenter: LoginPresenter): void {
    this.presenter = presenter;
  }

  login(request: LoginRequest): void {
    const response = new LoginResponse();

    const userID = this.authorizer!.authorize(request.username, request.password);
    if (!userID.isValid()) {
      response.message = LOGIN_FAILURE_MESSAGE;

      if (this.countInvalidLoginAttemps(request.username) >= 3) {
        this.authorizer!.hold(request.username);
      }
    } else {
      response.message = LOGIN_SUCCESS_MESSAGE;

      const user = this.userGateway!.getUser(userID);
      response.name = user.getName();
      response.lastLoginTime = user.getLastLoginTime();
      response.loginCount = user.getLoginCount();
    }
    this.presenter?.presentResponse(response);
  }

  private countInvalidLoginAttemps(username: string): number {
    let loginAttempts = this.loginAttemptCounter.get(username);
    if (loginAttempts === undefined) {
      loginAttempts = 0;
    }
    loginAttempts++;
    this.loginAttemptCounter.set(username, loginAttempts);
    return loginAttempts;
  }
}
