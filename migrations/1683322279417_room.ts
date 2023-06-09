/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('rooms', {
        room_id: 'id',
        name: {
            type: 'varchar(256)',
            notNull: true,
        },
        status: {
            type: 'varchar(256)',
            notNull: true,
        },
        actual_card:'id',
        whoisplaying:'id',
        order: {
            type: 'varchar(256)',
            notNull: true,
        },
        actual_color: {
            type: 'varchar(256)',
            notNull: true,
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('rooms');
}