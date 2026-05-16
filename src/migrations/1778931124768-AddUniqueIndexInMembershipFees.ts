import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexInMembershipFees1778931124768 implements MigrationInterface {
    name = 'AddUniqueIndexInMembershipFees1778931124768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_361708b7c5894b596836009e03" ON "membership_fee" ("userId", "period") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_361708b7c5894b596836009e03"`);
    }

}
