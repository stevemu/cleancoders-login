import { Authorizer } from '../../authorizer/Authorizer';
import { UserID } from '../../authorizer/UserID';

export abstract class AuthorizerSpy implements Authorizer {
  private username: string = '';
  private password: string = '';
  private heldUsername: string | null = null;

  authorize(username: string, password: string): UserID {
    this.username = username;
    this.password = password;
    return this.makeUser();
  }

  hold(username: string): void {
    this.heldUsername = username;
  }

  protected abstract makeUser(): UserID;

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getHeldUsername(): string | null {
    return this.heldUsername;
  }
}
