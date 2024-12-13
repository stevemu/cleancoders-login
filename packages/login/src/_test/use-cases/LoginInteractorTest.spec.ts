import { describe, expect, it } from '@jest/globals';
import { LoginInteractorImpl } from '../../use-cases/LoginInteractorImpl';
import { AuthorizerSpy } from '../authorizer/AuthorizerSpy';
import { UserGatewaySpy } from '../user-gateway/UserGatewaySpy';
import { LoginPresenterSpy } from '../presenter/LoginPresenterSpy';
import { AcceptingAuthorizerSpy } from '../authorizer/AcceptingAuthorizerSpy';
import { LoginRequest } from '../../use-cases/LoginRequest';
import { UserStub } from '../../entities/UserStub';
import { Authorizer } from '../../authorizer/Authorizer';
import { UserGateway } from '../../use-cases/UserGateway';
import { RejectingAuthorizerStub } from '../authorizer/RejectingAuthorizerStub';
import { UserGatewayStub } from '../user-gateway/UserGatewayStub';
import { LOGIN_FAILURE_MESSAGE } from '../../use-cases/LoginInteractor';
import { RejectingAuthorizerSpy } from '../authorizer/RejectingAuthorizerSpy';
import { RepeatedLoginAuthorizerMock } from '../authorizer/RepeatedLoginAuthorizerMock';
import { FakeAuthorizer } from '../authorizer/FakeAuthorizer';

describe('LoginInteractor', () => {
  let interactor: LoginInteractorImpl;
  let authorizerSpy: AuthorizerSpy;
  let userGatewaySpy: UserGatewaySpy;
  let presenterSpy: LoginPresenterSpy;

  beforeEach(() => {
    interactor = new LoginInteractorImpl();
    presenterSpy = new LoginPresenterSpy();
    interactor.setPresenter(presenterSpy);
  });

  describe('valid login', () => {
    beforeEach(() => {
      authorizerSpy = new AcceptingAuthorizerSpy();
      userGatewaySpy = new UserGatewaySpy();
      interactor.setAuthorizer(authorizerSpy);
      interactor.setUserGateway(userGatewaySpy);
    });

    test('normal login', () => {
      const request = new LoginRequest();
      request.username = 'username';
      request.password = 'password';
      interactor.login(request);

      expect(authorizerSpy.getUsername()).toBe('username');
      expect(authorizerSpy.getPassword()).toBe('password');
      expect(userGatewaySpy.getRequestedId()).toBe(AcceptingAuthorizerSpy.STUB_ID);

      const response = presenterSpy.getInvokedResponse();
      expect(response?.name).toBe(UserStub.STUB_NAME);
    });
  });

  describe('invalid login', () => {
    let authorizer: Authorizer;
    let userGateway: UserGateway;

    beforeEach(() => {
      authorizer = new RejectingAuthorizerStub();
      userGateway = new UserGatewayStub();
      interactor.setAuthorizer(authorizer);
      interactor.setUserGateway(userGateway);
    });

    test('when login fails, login failure message is presented', () => {
      const request = new LoginRequest();
      request.username = 'bad_username';
      request.password = 'bad_password';
      interactor.login(request);

      const invokedResponse = presenterSpy.getInvokedResponse();
      expect(invokedResponse?.message).toBe(LOGIN_FAILURE_MESSAGE);
    });
  });

  describe('repeated login', () => {
    let userGatewayStub: UserGatewayStub;

    beforeEach(() => {
      authorizerSpy = new RejectingAuthorizerSpy();
      userGatewayStub = new UserGatewayStub();
      interactor.setAuthorizer(authorizerSpy);
      interactor.setUserGateway(userGatewayStub);
    });

    test('3 strikes and you are out', () => {
      let request = new LoginRequest();
      request.username = 'username';
      request.password = 'bad_password';

      interactor.login(request);
      expect(authorizerSpy.getHeldUsername()).toBeNull();

      interactor.login(request);
      expect(authorizerSpy.getHeldUsername()).toBeNull();

      interactor.login(request);
      expect(authorizerSpy.getHeldUsername()).toBe('username');
    });
  });

  describe('mocked version of repeated login failure', () => {
    let userGatewayStub: UserGatewayStub;
    let authorizerMock: RepeatedLoginAuthorizerMock;

    beforeEach(() => {
      authorizerMock = new RepeatedLoginAuthorizerMock();
      userGatewayStub = new UserGatewayStub();
      interactor.setAuthorizer(authorizerMock);
      interactor.setUserGateway(userGatewayStub);
    });

    test('3 strikes and you are out', () => {
      let request = new LoginRequest();
      request.username = 'username';
      request.password = 'bad_password';

      interactor.login(request);
      interactor.login(request);
      interactor.login(request);

      expect(authorizerMock.verifyHeldOnThirdAttempt('username')).toBe(true);
    });
  });

  describe('login test using fake authorizer', () => {
    let authorizer: Authorizer;
    let userGateway: UserGateway;

    beforeEach(() => {
      authorizer = new FakeAuthorizer();
      userGateway = new UserGatewayStub();
      interactor.setAuthorizer(authorizer);
      interactor.setUserGateway(userGateway);
    });

    test('normal login', () => {
      let request = new LoginRequest();
      request.username = 'gooduser';
      request.password = 'goodpassword';

      interactor.login(request);

      const response = presenterSpy.getInvokedResponse();
      expect(response?.name).toBe(UserStub.STUB_NAME);
      expect(response?.lastLoginTime).toBe(UserStub.STUB_TIME);
      expect(response?.loginCount).toBe(UserStub.STUB_LOGIN_COUNT);
    });

    test('when login fails, login failure message is presented', () => {
      let request = new LoginRequest();
      request.username = 'bad_username';
      request.password = 'bad_password';

      interactor.login(request);

      const invokedResponse = presenterSpy.getInvokedResponse();
      expect(invokedResponse?.message).toBe(LOGIN_FAILURE_MESSAGE);
    });
  });
});
