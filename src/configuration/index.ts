import * as yargs from 'yargs';

import type { IInspectionOptions } from './inspection-options';
import { inspectionOptions } from './inspection-options';

export type IConfiguration = IInspectionOptions;

let _configuration: IConfiguration | undefined;

export function loadConfiguration(argv: string[]): IConfiguration {
  _configuration = yargs
    .env(true)
    .wrap(process.stdout.columns)
    .usage(
      [
        'You can set every option also with an environment variable.',
        'Just use UPPER_SNAKE_CASE for the name instead of camelCase.',
      ].join(' '),
    )
    .options(inspectionOptions)
    .parse(argv);

  return _configuration;
}
