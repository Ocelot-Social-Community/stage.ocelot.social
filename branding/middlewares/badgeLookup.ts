/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import crypto from 'node:crypto'

import fetch from 'node-fetch'

import normalizeEmail from '@schema/resolvers/helpers/normalizeEmail'

// config
/* eslint-disable n/no-process-env */
const BADGE_ATTRIBUTION_SERVICE_URL = process.env.BADGE_ATTRIBUTION_SERVICE_URL ?? null
const BADGE_ATTRIBUTION_SERVICE_SECRET = process.env.BADGE_ATTRIBUTION_SERVICE_SECRET ?? ''
/* eslint-enable n/no-process-env */

const assignBadges = async (email: string, context) => {
  if (!BADGE_ATTRIBUTION_SERVICE_URL) {
    return
  }

  const normalizedEmail = normalizeEmail(email)
  const hash = crypto.createHash('sha256').update(normalizedEmail).digest('hex')

  const body = { hash, secret: BADGE_ATTRIBUTION_SERVICE_SECRET }
  try {
    const response = await fetch(BADGE_ATTRIBUTION_SERVICE_URL, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.status !== 200) {
      return
    }

    const badges = (await response.json()).badges as [string]

    const session = context.driver.session()
    try {
      await session.writeTransaction((transaction) => {
        return transaction.run(
          `
            MATCH(u:User)-[:PRIMARY_EMAIL]->(e:EmailAddress {email: $email})
            MATCH(b:Badge)
            WHERE ANY (badgeId IN b.id WHERE badgeId IN $badges)
            MERGE (u)<-[:REWARDED]-(b)
          `,
          { email: normalizedEmail, badges },
        )
      })
    } finally {
      session.close()
    }
    // eslint-disable-next-line no-catch-all/no-catch-all
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

export default {
  Mutation: {
    login: async (resolve, root, args, context, info) => {
      const resolved = await resolve(root, args, context, info)
      void assignBadges(args.email, context)
      return resolved
    },
    SignupVerification: async (resolve, root, args, context, info) => {
      const resolved = await resolve(root, args, context, info)
      void assignBadges(args.email, context)
      return resolved
    },
  },
}
