import type { CognitoUserPool, ISignUpResult } from 'amazon-cognito-identity-js';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { userPool } from '../configuration/aws-cognito.config';

export class AuthService {
  private static instance: AuthService;

  private cognitoUserPool: CognitoUserPool;

  static init(): AuthService {
    this.instance = new AuthService();
    this.instance.cognitoUserPool = userPool;
    return this.instance;
  }

  async authenticateUser(username: string, password: string): Promise<any> {
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: this.cognitoUserPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          const data = {
            refreshToken: session.getRefreshToken().getToken(),
            accessToken: session.getAccessToken().getJwtToken(),
            accessTokenExpiresAt: session.getAccessToken().getExpiration(),
            idToken: session.getIdToken().getJwtToken(),
            idTokenExpiresAt: session.getAccessToken().getExpiration(),
          };
          resolve(data);
        },

        onFailure: (err) => {
          reject(err);
        },

        newPasswordRequired: (_userAttributes, _requiredAttributes) => {
          const data = {
            nextStep: 'NEW_PASSWORD_REQUIRED',
          };
          resolve(data);
        },
      });
    });
  }

  async signOut(email: string): Promise<void> {
    return new Promise((resolve, _reject) => {
      const userData = {
        Username: email,
        Pool: this.cognitoUserPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.signOut();

      resolve();
    });
  }

  async signUp(username: string, password: string, email: string): Promise<string> {
    const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })];

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.cognitoUserPool.signUp(username, password, attributeList, null, (err: Error, result: ISignUpResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.user.getUsername());
        }
      });
    });
  }

  async verifyOTP(username: string, otp: string): Promise<void> {
    const userData = {
      Username: username,
      Pool: this.cognitoUserPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(otp, true, (err: Error, _result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
