import { UserGateway } from '../../use-cases/UserGateway';
import { UserID } from '../../authorizer/UserID';
import { UserStub } from '../../entities/UserStub';

export class UserGatewayStub implements UserGateway {
  getUser(id: UserID) {
    return new UserStub();
  }
}
