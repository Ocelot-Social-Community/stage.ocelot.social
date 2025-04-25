import { MikroORM } from '@mikro-orm/mariadb'

import config from '#root/mikro-orm.config'

import { EmailBadges } from './EmailBadges.entity'

import type { Env } from '#src/env.js'
import type { Options, EntityManager, EntityRepository } from '@mikro-orm/mariadb'

export interface Services {
  orm: MikroORM
  em: EntityManager
  EmailBadges: EntityRepository<EmailBadges>
}

let cache: Services

export async function initORM(env: Env, options?: Options): Promise<Services> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (cache) {
    return cache
  }

  // allow overriding config options for testing
  const orm = await MikroORM.init({
    ...config,
    ...options,
  })

  // save to cache before returning
  return (cache = {
    orm,
    em: orm.em,
    EmailBadges: orm.em.getRepository(EmailBadges),
  })
}
