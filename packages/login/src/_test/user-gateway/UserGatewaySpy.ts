import { UserGateway } from '../../use-cases/UserGateway';
import { User } from '../../entities/User';
import { UserID } from '../../authorizer/UserID';
import { UserStub } from '../../entities/UserStub';

export class UserGatewaySpy implements UserGateway {
  private requestedId: UserID | null = null;

  getUser(id: UserID): User {
    this.requestedId = id;
    return new UserStub();
  }

  getRequestedId(): UserID | null {
    return this.requestedId;
  }
}
