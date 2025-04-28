import { OptionalProps, Property } from '@mikro-orm/mariadb'

export abstract class BaseEntity<Optional = never> {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
