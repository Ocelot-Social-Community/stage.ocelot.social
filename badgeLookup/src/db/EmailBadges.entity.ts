import { Entity, PrimaryKey, PrimaryKeyProp } from '@mikro-orm/mariadb'

import { BaseEntity } from './Base.entity'

@Entity()
export class EmailBadges extends BaseEntity {
  @PrimaryKey({ length: 64 })
  hash!: string

  @PrimaryKey()
  badge!: string;

  // this is needed for proper type checks in `FilterQuery`
  [PrimaryKeyProp]?: ['hash', 'badge']

  constructor(hash: string, badge: string) {
    super()
    this.hash = hash
    this.badge = badge
  }
}
