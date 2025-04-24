import { FormatRegistry, Type, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import Fastify from 'fastify'

import { IsSHA256 } from './formats'

import type { Env } from './env'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

function createServer(env: Env) {
  // Register EMail format
  FormatRegistry.Set('sha256', (value) => IsSHA256(value))

  // Fatify
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

      // request.body.hash
      const badges = ['badge1', 'badge2', 'badge3']

      return reply.status(200).send({ success: true, badges })
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

      // request.body.hash
      const badges = ['badge1', 'badge2', 'badge3', request.body.badge]

      return reply.status(200).send({ success: true, badges })
    })

  return fastify
}

export { createServer }
