import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRoles1777991921558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            INSERT INTO role (name) VALUES
            ('USUARIO'),
            ('ADMINISTRADOR'),
            ('TESORERO'),
            ('RRHH'),
            ('BIBLIOTECARIO')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DELETE FROM role
            WHERE name IN (
                'USUARIO',
                'ADMINISTRADOR',
                'TESORERO',
                'RRHH',
                'BIBLIOTECARIO'
            )
        `);
    }

}
