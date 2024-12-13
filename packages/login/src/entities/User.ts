export class User {
  private name: string = '';
  private lastLoginTime: Date | null = null;
  private loginCount: number = 0;

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getLastLoginTime(): Date | null {
    return this.lastLoginTime;
  }

  setLastLoginTime(lastLoginTime: Date): void {
    this.lastLoginTime = lastLoginTime;
  }

  getLoginCount(): number {
    return this.loginCount;
  }

  setLoginCount(loginCount: number): void {
    this.loginCount = loginCount;
  }
}
