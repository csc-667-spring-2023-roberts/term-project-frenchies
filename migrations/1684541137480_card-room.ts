/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('card_room', {
        player_id: 'id',
        card_id: 'id',
        status : {
            type: 'varchar(256)',
            notNull: true,
        },
    });

}

export async function down(pgm: MigrationBuilder): Promise<void> {
}
