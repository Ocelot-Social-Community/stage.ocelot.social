import { loadEnv } from '#src/env'

process.env.SECRET_REQUEST = 'CORRECT-SECRET'
process.env.SECRET_SUBMIT = 'CORRECT-SECRET'

loadEnv()
