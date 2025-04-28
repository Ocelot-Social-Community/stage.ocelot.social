import { FormatRegistry, Type, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import { RequestContext } from '@mikro-orm/mariadb'
import Fastify from 'fastify'

import { initORM } from './db/db'
import { EmailBadges } from './db/EmailBadges.entity'
import { IsSHA256 } from './formats'

import type { Env } from './env'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

export async function createServer(env: Env) {
  const db = await initORM(env)

  if (env.DB_MIGRATE) {
    // migrate
    await db.orm.migrator.up()
    // sync the schema
    await db.orm.schema.updateSchema()
  }

  // Register EMail format
  FormatRegistry.Set('sha256', (value) => IsSHA256(value))

  // Fastify
  const fastify = Fastify().setValidatorCompiler(TypeBoxValidatorCompiler)

  // Request
  const schemaRequest = {
    body: Type.Object({
      secret: Type.String(),
      hash: Type.String({ format: 'sha256' }),
    }),
    response: {
      200: Type.Object({
        success: Type.Boolean({ default: true }),
        badges: Type.Array(Type.String()),
      }),
      400: Type.Object({
        success: Type.Boolean({ default: false }),
      }),
    },
  }

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/badges', { schema: schemaRequest }, async (request, reply) => {
      if (request.body.secret !== env.SECRET_REQUEST) {
        return reply.status(400).send({ success: false })
      }

      const badges = await db.em.find(EmailBadges, { hash: request.body.hash })

      return reply.status(200).send({ success: true, badges: badges.map((badge) => badge.badge) })
    })

  // Submit
  const schemaSubmit = {
    body: Type.Object({
      secret: Type.String(),
      hash: Type.String({ format: 'sha256' }),
      badge: Type.String(),
    }),
    response: {
      200: Type.Object({
        success: Type.Boolean({ default: true }),
        badges: Type.Array(Type.String()),
      }),
      400: Type.Object({
        success: Type.Boolean({ default: false }),
      }),
    },
  }

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/badges/submit', { schema: schemaSubmit }, async (request, reply) => {
      if (request.body.secret !== env.SECRET_SUBMIT) {
        return reply.status(400).send({ success: false })
      }

      const emailBadge = new EmailBadges(request.body.hash, request.body.badge)
      await db.em.upsert(EmailBadges, emailBadge, { onConflictAction: 'ignore' })

      const badges = await db.em.find(EmailBadges, { hash: request.body.hash })

      return reply.status(200).send({ success: true, badges: badges.map((badge) => badge.badge) })
    })

  // shut down the connection when closing the app
  fastify.addHook('onClose', async () => {
    await db.orm.close()
  })

  // register request context hook
  fastify.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(db.em, done)
  })

  return fastify
}
