import { Authorizer } from '../../authorizer/Authorizer';
import { UserID } from '../../authorizer/UserID';
import { InvalidUserID } from '../../authorizer/InvalidUserID';

export class RejectingAuthorizerStub implements Authorizer {
  authorize(username: string, password: string): UserID {
    return new InvalidUserID();
  }

  hold(username: string): void {}
}
