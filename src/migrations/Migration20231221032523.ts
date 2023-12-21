import { Migration } from '@mikro-orm/migrations';

export class Migration20231221032523 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "fname" text not null, add column "lname" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "fname";');
    this.addSql('alter table "user" drop column "lname";');
  }

}
