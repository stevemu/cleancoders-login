import { User } from './User';

export class UserStub extends User {
  public static STUB_TIME = new Date(2013, 11, 13, 10, 31);
  public static STUB_NAME = 'name stub';
  public static STUB_LOGIN_COUNT = 99;

  getLoginCount(): number {
    return UserStub.STUB_LOGIN_COUNT;
  }

  getLastLoginTime(): Date | null {
    return UserStub.STUB_TIME;
  }

  getName(): string {
    return UserStub.STUB_NAME;
  }
}
