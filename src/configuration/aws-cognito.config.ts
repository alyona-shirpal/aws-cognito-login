import { CognitoUserPool } from 'amazon-cognito-identity-js';
import dotenv from 'dotenv';

import { loadConfiguration } from './index';

dotenv.config();

const config = loadConfiguration(process.argv);

const poolData = {
  UserPoolId: config.awsUserPoolId,
  ClientId: config.awsClientId,
};

export const userPool = new CognitoUserPool(poolData);
