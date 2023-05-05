/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('user-to-room', {
        id: 'id',
        currentroomid: 'id',
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('user-to-room');
}
