import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGames1778941481900 implements MigrationInterface {
    name = 'CreateGames1778941481900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_61ffb42a517ba6b0a5e92ffb299" UNIQUE ("name"), CONSTRAINT "PK_ce6b4c494dc3bef381165ff3c51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_mechanic" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_50c9bc91476d14c6a22323c4279" UNIQUE ("name"), CONSTRAINT "PK_f8ed5bba1297aa5c288f32951ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."game_type_enum" AS ENUM('BOARD_GAME', 'ROLE_PLAYING_GAME')`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "duration" integer, "minPlayers" integer, "maxPlayers" integer, "publisher" character varying NOT NULL, "type" "public"."game_type_enum" NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_categories_game_category" ("gameId" integer NOT NULL, "gameCategoryId" integer NOT NULL, CONSTRAINT "PK_7995bd6380d3631ff2c289eff25" PRIMARY KEY ("gameId", "gameCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f65d3ba44be342cc0e7c57451f" ON "game_categories_game_category" ("gameId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7af9b63a3b47e4e2e21ee82406" ON "game_categories_game_category" ("gameCategoryId") `);
        await queryRunner.query(`CREATE TABLE "game_mechanics_game_mechanic" ("gameId" integer NOT NULL, "gameMechanicId" integer NOT NULL, CONSTRAINT "PK_31835ef10adeaa049a7dbca0750" PRIMARY KEY ("gameId", "gameMechanicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_20f817e1694b9b5615dcc3e0f1" ON "game_mechanics_game_mechanic" ("gameId") `);
        await queryRunner.query(`CREATE INDEX "IDX_830c9ee8f8748a8570fb82e66e" ON "game_mechanics_game_mechanic" ("gameMechanicId") `);
        await queryRunner.query(`ALTER TABLE "game_categories_game_category" ADD CONSTRAINT "FK_f65d3ba44be342cc0e7c57451fe" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "game_categories_game_category" ADD CONSTRAINT "FK_7af9b63a3b47e4e2e21ee824062" FOREIGN KEY ("gameCategoryId") REFERENCES "game_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_mechanics_game_mechanic" ADD CONSTRAINT "FK_20f817e1694b9b5615dcc3e0f1e" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "game_mechanics_game_mechanic" ADD CONSTRAINT "FK_830c9ee8f8748a8570fb82e66e2" FOREIGN KEY ("gameMechanicId") REFERENCES "game_mechanic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_mechanics_game_mechanic" DROP CONSTRAINT "FK_830c9ee8f8748a8570fb82e66e2"`);
        await queryRunner.query(`ALTER TABLE "game_mechanics_game_mechanic" DROP CONSTRAINT "FK_20f817e1694b9b5615dcc3e0f1e"`);
        await queryRunner.query(`ALTER TABLE "game_categories_game_category" DROP CONSTRAINT "FK_7af9b63a3b47e4e2e21ee824062"`);
        await queryRunner.query(`ALTER TABLE "game_categories_game_category" DROP CONSTRAINT "FK_f65d3ba44be342cc0e7c57451fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_830c9ee8f8748a8570fb82e66e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_20f817e1694b9b5615dcc3e0f1"`);
        await queryRunner.query(`DROP TABLE "game_mechanics_game_mechanic"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7af9b63a3b47e4e2e21ee82406"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f65d3ba44be342cc0e7c57451f"`);
        await queryRunner.query(`DROP TABLE "game_categories_game_category"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TYPE "public"."game_type_enum"`);
        await queryRunner.query(`DROP TABLE "game_mechanic"`);
        await queryRunner.query(`DROP TABLE "game_category"`);
    }

}
