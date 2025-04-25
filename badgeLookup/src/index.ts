import { loadEnv, env } from './env'
import { createServer } from './server'

loadEnv() // Executed synchronously before the rest of your app loads

const run = async () => {
  const server = await createServer(env)
  // Run the server!
  try {
    void server.listen({ port: env.PORT, host: '0.0.0.0' })
    // eslint-disable-next-line no-console
    console.log(`Server up and running on 0.0.0.0:${env.PORT}`)
    // eslint-disable-next-line no-catch-all/no-catch-all
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

void run()
