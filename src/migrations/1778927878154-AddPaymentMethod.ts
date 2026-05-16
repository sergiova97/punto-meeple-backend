import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentMethod1778927878154 implements MigrationInterface {
    name = 'AddPaymentMethod1778927878154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_method_enum" AS ENUM('TRANSFER')`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "method" "public"."payment_method_enum" NOT NULL DEFAULT 'TRANSFER'`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "method"`);
        await queryRunner.query(`DROP TYPE "public"."payment_method_enum"`);
    }

}
