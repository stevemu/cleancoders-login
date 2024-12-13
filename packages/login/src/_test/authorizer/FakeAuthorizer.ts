import { Authorizer } from '../../authorizer/Authorizer';
import { UserID } from '../../authorizer/UserID';
import { InvalidUserID } from '../../authorizer/InvalidUserID';

export class FakeAuthorizer implements Authorizer {
  authorize(username: string, password: string): UserID {
    if (username.startsWith('good')) {
      return new UserID(1);
    } else {
      return new InvalidUserID();
    }
  }

  hold(username: string): void {
    // do nothing
  }
}
