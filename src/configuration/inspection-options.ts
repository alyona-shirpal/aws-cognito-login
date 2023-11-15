import type { OptionsOf } from './options-of';

export interface IInspectionOptions {
  backendPort: number;
  awsUserPoolId: string;
  awsClientId: string;
}

export const inspectionOptions: OptionsOf<IInspectionOptions> = {
  backendPort: {
    description: 'Port for backend server',
    type: 'number',
    default: 8082,
  },
  awsUserPoolId: {
    description: 'Aws user pool id',
    type: 'string',
    default: '',
  },
  awsClientId: {
    description: 'Aws client id',
    type: 'string',
    default: '',
  },
};
