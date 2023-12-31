import type { Options } from 'yargs';

type IsLiteral<T> = T extends string ? (string extends T ? false : true) : false;
type DemandedField<T, P extends keyof T> = { demandOption: true } | { default: T[P] };

export type OptionsOf<T> = Required<{
  [P in keyof T]: Options &
    (T[P] extends string
      ? { type: 'string' } & DemandedField<T, P>
      : T[P] extends number
      ? { type: 'number' } & DemandedField<T, P>
      : T[P] extends boolean
      ? { type: 'boolean' } & DemandedField<T, P>
      : T[P] extends unknown[]
      ? { type: 'array' } & DemandedField<T, P>
      : T[P] extends string | undefined
      ? { type: 'string' }
      : T[P] extends number | undefined
      ? { type: 'number' }
      : T[P] extends boolean | undefined
      ? { type: 'boolean' }
      : T[P] extends unknown[] | undefined
      ? { type: 'array' }
      : never) &
    (IsLiteral<T[P]> extends true ? { choices: Array<T[P]> } : Record<string, unknown>);
}>;
