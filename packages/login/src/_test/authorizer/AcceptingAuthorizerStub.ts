import { Authorizer } from '../../authorizer/Authorizer';
import { UserID } from '../../authorizer/UserID';

export class AcceptingAuthorizerStub implements Authorizer {
  authorize(username: string, password: string): UserID {
    return new UserID(1);
  }

  hold(username: string): void {}
}
