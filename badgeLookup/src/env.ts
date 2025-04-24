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
    default: 3000,
  },
}

export type Env = EnvType<typeof schema>

// eslint-disable-next-line import/no-mutable-exports
export let env: Env

export function loadEnv(): void {
  env = load(schema)
}
