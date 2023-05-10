/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('message_user', {
        id: 'id',
        conv_id: 'id',
        sender_id: 'id',
        content: {
            type: 'varchar(256)',
            notNull: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('message_user');
}