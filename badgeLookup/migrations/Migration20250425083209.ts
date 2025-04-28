/* eslint-disable @typescript-eslint/require-await */
import { Migration } from '@mikro-orm/migrations'

export class Migration20250425083209 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`email_badges\` (\`hash\` varchar(64) not null, \`badge\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, primary key (\`hash\`, \`badge\`)) default character set utf8mb4 engine = InnoDB;`,
    )
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`email_badges\`;`)
  }
}
