import { existsSync, readFileSync } from 'node:fs'

import { defineConfig, GeneratedCacheAdapter } from '@mikro-orm/mariadb'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

import { env, loadEnv } from '#src/env'

import type { Options } from '@mikro-orm/mariadb'

const options = {} as Options

loadEnv()

if (process.env.NODE_ENV === 'production' && existsSync('./temp/metadata.json')) {
  options.metadataCache = {
    enabled: true,
    adapter: GeneratedCacheAdapter,
    // temp/metadata.json can be generated via `npx mikro-orm-esm cache:generate --combine`
    options: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: JSON.parse(readFileSync('./temp/metadata.json', { encoding: 'utf8' })),
    },
  }
} else {
  options.metadataProvider = TsMorphMetadataProvider
}

export default defineConfig({
  // we cannot use the config here, since this is required at build time.
  clientUrl: env.DB_URL,
  // folder based discovery setup, using common filename suffix
  entities: ['build/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  // enable debug mode to log SQL queries and discovery information
  debug: false,
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)
  dynamicImportProvider: (id) => import(id),
  // for highlighting the SQL queries
  highlighter: new SqlHighlighter(),
  ...options,
})
