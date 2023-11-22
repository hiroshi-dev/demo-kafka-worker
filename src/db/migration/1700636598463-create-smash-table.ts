import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700636598463 implements MigrationInterface {
  name = 'Migration1700636598463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "smash" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "smashed_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d84655e2d0bb14bd9d42dc8feaa" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "smash"`);
  }
}
