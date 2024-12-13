import { AcceptingAuthorizerSpy } from './AcceptingAuthorizerSpy';
import { UserID } from '../../authorizer/UserID';
import { InvalidUserID } from '../../authorizer/InvalidUserID';

export class RejectingAuthorizerSpy extends AcceptingAuthorizerSpy {
  protected makeUser(): UserID {
    return new InvalidUserID();
  }
}
