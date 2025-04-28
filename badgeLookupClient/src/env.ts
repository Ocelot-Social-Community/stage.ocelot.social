import { load } from 'ts-dotenv'

import type { EnvType } from 'ts-dotenv'

export const schema = {
  NODE_ENV: {
    type: ['production' as const, 'development' as const, 'test' as const],
    default: 'development',
  },
  BADGE_LOOKUP_SERVICE_SUBMIT_URL: {
    type: String,
    default: 'http://localhost:4001/badges/submit',
  },
  SECRET_SUBMIT: {
    type: String,
    optional: false,
  },
}

export type Env = EnvType<typeof schema>

// eslint-disable-next-line import/no-mutable-exports
export let env: Env

export function loadEnv(): void {
  env = load(schema)
}
