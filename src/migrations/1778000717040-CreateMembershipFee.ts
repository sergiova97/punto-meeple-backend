import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMembershipFee1778000717040 implements MigrationInterface {
    name = 'CreateMembershipFee1778000717040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "reference" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."membership_fee_status_enum" AS ENUM('PENDING', 'PAID', 'OVERDUE')`);
        await queryRunner.query(`CREATE TABLE "membership_fee" ("id" SERIAL NOT NULL, "period" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "status" "public"."membership_fee_status_enum" NOT NULL DEFAULT 'PENDING', "userId" integer, "paymentId" integer, CONSTRAINT "PK_1991a379874cf923bddc1e749e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "membership_fee" ADD CONSTRAINT "FK_b2c831f151b773a3f35665a1c2c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership_fee" ADD CONSTRAINT "FK_84e73de93830ce43ab4f09f2f74" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership_fee" DROP CONSTRAINT "FK_84e73de93830ce43ab4f09f2f74"`);
        await queryRunner.query(`ALTER TABLE "membership_fee" DROP CONSTRAINT "FK_b2c831f151b773a3f35665a1c2c"`);
        await queryRunner.query(`DROP TABLE "membership_fee"`);
        await queryRunner.query(`DROP TYPE "public"."membership_fee_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
