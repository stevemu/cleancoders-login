import { UserID } from './UserID';

export interface Authorizer {
  authorize(username: string, password: string): UserID;
  hold(username: string): void;
}
