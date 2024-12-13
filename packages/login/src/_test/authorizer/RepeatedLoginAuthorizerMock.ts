import { Authorizer } from '../../authorizer/Authorizer';
import { UserID } from '../../authorizer/UserID';
import { InvalidUserID } from '../../authorizer/InvalidUserID';

export class RepeatedLoginAuthorizerMock implements Authorizer {
  private actions: string[] = [];

  authorize(username: string, password: string): UserID {
    this.actions.push(`Authorize:${username}`);
    return new InvalidUserID();
  }

  hold(username: string) {
    this.actions.push(`Hold:${username}`);
  }

  verifyHeldOnThirdAttempt(username: string) {
    const expectedActions = [
      `Authorize:${username}`,
      `Authorize:${username}`,
      `Authorize:${username}`,
      `Hold:${username}`,
    ];
    return this.actions.join(',') === expectedActions.join(',');
  }
}
