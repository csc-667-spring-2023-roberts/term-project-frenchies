/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('session', {
        sid: {
            type: 'varchar(256)',
            notNull: true,
            primaryKey: true,
        },
        sess: {
            type: 'json',
            notNull: true,
        },
        expire: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('session');
}
