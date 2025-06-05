/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import crypto from 'node:crypto'

import fetch from 'node-fetch'

// eslint-disable-next-line import/no-cycle
import badgesResolver from '@graphql/resolvers/badges'
import normalizeEmail from '@graphql/resolvers/helpers/normalizeEmail'
import { Context } from '@src/server'

import { assignVerificationBadge } from './locationVerification'

const {
  Mutation: { rewardTrophyBadge },
} = badgesResolver

// config
/* eslint-disable n/no-process-env */
const BADGE_ATTRIBUTION_SERVICE_URL = process.env.BADGE_ATTRIBUTION_SERVICE_URL ?? null
const BADGE_ATTRIBUTION_SERVICE_SECRET = process.env.BADGE_ATTRIBUTION_SERVICE_SECRET ?? ''
/* eslint-enable n/no-process-env */

const assignBadges = async (email: string, context: Context) => {
  if (!BADGE_ATTRIBUTION_SERVICE_URL) {
    return
  }

  // We need the user for the resolver call. We attribute the badge as user: 0
  context.user = { id: 0 }

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

    const users = (
      await context.database.query({
        query: `
      MATCH(user:User)-[:PRIMARY_EMAIL]->(e:EmailAddress {email: $email})
      RETURN user {.*}
      `,
        variables: {
          email: normalizedEmail,
        },
      })
    ).records.map((record) => record.get('user'))

    if (users.length !== 1) {
      return
    }

    const user = users[0]

    for await (const badgeId of badges) {
      await rewardTrophyBadge(null, { badgeId, userId: user.id }, context, null)
    }

    // eslint-disable-next-line no-catch-all/no-catch-all
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

export default {
  Mutation: {
    login: async (resolve, root, args, context: Context, info) => {
      const { email } = args
      const resolved = await resolve(root, args, context, info)
      void assignBadges(email, context)
      return resolved
    },
    SignupVerification: async (resolve, root, args, context: Context, info) => {
      const { email } = args
      const resolved = await resolve(root, args, context, info)
      if (resolved.id && resolved.locationName) {
        void assignVerificationBadge(resolved.id, root, context, info)
      }
      void assignBadges(email, context)
      return resolved
    },
  },
}
