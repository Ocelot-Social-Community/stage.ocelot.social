import { load } from 'ts-dotenv'

import type { EnvType } from 'ts-dotenv'

export const schema = {
  NODE_ENV: {
    type: ['production' as const, 'development' as const, 'test' as const],
    default: 'development',
  },
  SECRET_REQUEST: {
    type: String,
    optional: false,
  },
  SECRET_SUBMIT: {
    type: String,
    optional: false,
  },
  PORT: {
    type: Number,
    default: 4000,
  },
  DB_MIGRATE: {
    type: Boolean,
    default: true,
  },
  DB_URL: {
    type: String,
    default: 'mysql://root:@localhost:3306/badge-lookup',
  },
}

export type Env = EnvType<typeof schema>

// eslint-disable-next-line import/no-mutable-exports
export let env: Env

export function loadEnv(): void {
  env = load(schema)
}
