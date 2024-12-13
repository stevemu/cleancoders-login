import { UserID } from './UserID';

export class InvalidUserID extends UserID {
  constructor() {
    super(-1);
  }

  isValid(): boolean {
    return false;
  }
}
