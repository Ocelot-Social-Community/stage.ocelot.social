import crypto from 'node:crypto'
import { createReadStream } from 'node:fs'
import fs from 'node:fs/promises'
import readline from 'node:readline/promises'

import fetch from 'node-fetch'
import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'

import { loadEnv, env } from './env'

loadEnv() // Executed synchronously before the rest of your app loads

const query = async (email: string, badge: string) => {
  const normalizedEmail = normalizeEmail(email)
  if (!isEmail(email) || !normalizedEmail) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${email} is not an valid email`)
    return
  }

  const hash = crypto.createHash('sha256').update(normalizedEmail).digest('hex')

  const body = {
    secret: env.SECRET_SUBMIT,
    hash,
    badge,
  }

  const response = await fetch(env.BADGE_LOOKUP_SERVICE_SUBMIT_URL, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = (await response.json()) as { success: boolean; badges?: [string] }

  if (!data.success) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${email} could not be registered successfully`)
    return
  }

  // eslint-disable-next-line no-console
  console.log(
    `Success: ${email} - registered badge ${badge} - all badges: ${data.badges?.join(',') ?? 'none'}`,
  )
}

const run = async () => {
  const dataFolder = './data/'

  const files = await fs.readdir(dataFolder)

  for await (const filename of files) {
    if (filename === '.gitignore') {
      continue
    }
    // eslint-disable-next-line no-console
    console.log(`File: ${filename}`)

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stream = createReadStream(dataFolder + filename)
    const file = readline.createInterface({
      input: stream,
      output: process.stdout,
      terminal: false,
    })
    const badge = filename

    for await (const dirtyEmail of file) {
      const email = dirtyEmail.replace(/"/g, '').trim()
      await query(email, badge)
    }

    file.close()
    stream.close()
  }

  // eslint-disable-next-line no-console
  console.log('finished')
}

void run()
