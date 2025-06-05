import { Entity, PrimaryKey, PrimaryKeyProp } from '@mikro-orm/mariadb'

import { BaseEntity } from './Base.entity'

@Entity()
export class Email extends BaseEntity {
  @PrimaryKey({ length: 64 })
  hash!: string

  @PrimaryKey()
  email!: string;

  // this is needed for proper type checks in `FilterQuery`
  [PrimaryKeyProp]?: ['hash', 'email']

  constructor(hash: string, email: string) {
    super()
    this.hash = hash
    this.email = email
  }
}
