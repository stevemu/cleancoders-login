import { AuthorizerSpy } from './AuthorizerSpy';
import { UserID } from '../../authorizer/UserID';

export class AcceptingAuthorizerSpy extends AuthorizerSpy {
  public static STUB_ID = new UserID(1);

  protected makeUser(): UserID {
    return AcceptingAuthorizerSpy.STUB_ID;
  }
}
