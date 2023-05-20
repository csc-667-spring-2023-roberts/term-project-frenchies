/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('player', {
        player_id: 'id',
        user_id: 'id',
        room_id : 'id',
    });

}

export async function down(pgm: MigrationBuilder): Promise<void> {
}
