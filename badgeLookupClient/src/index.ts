import crypto from 'node:crypto'
import fetch from 'node-fetch'
import { loadEnv, env } from './env'
import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import readline from 'node:readline/promises'
import fs from 'node:fs/promises'
import {createReadStream} from 'node:fs'
import path from 'node:path'

loadEnv() // Executed synchronously before the rest of your app loads

const query = async (email: string, badge: string) => {
  if (!isEmail(email)) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${email} is not an valid email`)
    return
  }

  const normalizedEmail = normalizeEmail(email)
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
  console.log(`Success: ${email} - registered badge ${badge} - all badges: ${data.badges}`)
}

const run = async () => {
  const dataFolder = './data/'

  const files = await fs.readdir(dataFolder)

  for await (const filename of files) {
    if (filename === '.gitignore') {
      continue
    }
    const file = readline.createInterface({
      input: createReadStream(dataFolder + filename),
      output: process.stdout,
      terminal: false,
    })
    const badge = filename

    for await (const dirtyEmail of file) {
      const email = dirtyEmail.replace(/"/g, '')
      await query(email, badge)
    }
  }
}

void run()
