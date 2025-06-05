import crypto from 'node:crypto'
import { createReadStream } from 'node:fs'
import fs from 'node:fs/promises'
import readline from 'node:readline/promises'

import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'

import { initORM } from '#src/db/db'
import { Email } from '#src/db/Email.entity'
import { loadEnv, env } from '#src/env'
import path from 'node:path'

loadEnv() // Executed synchronously before the rest of your app loads

const run = async () => {
  // does not migrate!
  const db = await initORM(env)

  const dataFolder = path.resolve('../badgeLookupClient/data-applied')
  const files = await fs.readdir(dataFolder)

  for await (const filename of files) {
    if (filename === '.gitignore') {
      continue
    }
    // eslint-disable-next-line no-console
    console.log(`File: ${filename}`)

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stream = createReadStream(dataFolder + '/' + filename)
    const file = readline.createInterface({
      input: stream,
      output: process.stdout,
      terminal: false,
    })

    const emails: Email[] = []

    for await (const dirtyEmail of file) {
      const email = dirtyEmail.replace(/"/g, '').trim()
      const normalizedEmail = normalizeEmail(email)
      if (!isEmail(email) || !normalizedEmail) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${email} is not an valid email`)
        continue
      }
      const hash = crypto.createHash('sha256').update(normalizedEmail).digest('hex')
      emails.push(new Email(hash, normalizedEmail))
    }
    if (emails.length) {
      await db.em.upsertMany(emails)
    }

    file.close()
    stream.close()
  }
}

void run()
