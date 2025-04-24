import { loadEnv, env } from './env'
import { createServer } from './server'

loadEnv() // Executed synchronously before the rest of your app loads

const server = createServer(env)
// Run the server!
try {
  void server.listen({ port: env.PORT })
  // eslint-disable-next-line no-catch-all/no-catch-all
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
