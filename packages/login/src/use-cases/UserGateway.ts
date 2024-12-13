import { User } from '../entities/User';
import { UserID } from '../authorizer/UserID';

export interface UserGateway {
  getUser(id: UserID): User;
}
