/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('user_to_room', {
        id: 'id',
        currentroom_id: 'id',
        user_id: 'id',
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('user_to_room');
}

