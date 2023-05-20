import db from '../../../services/database';
import {RoomEntity} from '../../schemas/entities';
import {FindFirstCondition, FindFirstConditionToQuery} from './room.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class RoomORM {
    public async Create(name: string): Promise<RoomEntity> {
        const createdRoom = await db.one(
            `INSERT INTO rooms (actual_card, actual_color, name, "order", status, whoisplaying)
            VALUES (-1, '', $1, 'ASC', 'waiting', -1)
            RETURNING room_id, actual_card, actual_color, name, "order", status, whoisplaying`,
            [name]
        );

        return createdRoom as RoomEntity;
    }

    public async FindFirst(condition: FindFirstCondition): Promise<RoomEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const room = await db.one(
                `SELECT room_id FROM rooms WHERE ${conditionQuery}`,
                [condition.where.room_id]
            );

            return room as RoomEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }

    public async FindAll(): Promise<RoomEntity[] | null> {
        try {
            const rooms = await db.any(
                'SELECT * FROM rooms'
            );

            return rooms as RoomEntity[];
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }

    public async Update(roomId: number, actualCard: number, actualPlayer: number, actualColor: string, status: string): Promise<RoomEntity> {
        try {
            const updatedRoom = await db.one(
                `UPDATE rooms
                SET actual_card = $2, actual_color = $3, whoisplaying = $4, status = $5
                WHERE room_id = $1
                RETURNING room_id, actual_card, actual_color, name, "order", status, whoisplaying`,
                [roomId, actualCard, actualColor, actualPlayer, status]
            );
            return updatedRoom as RoomEntity;
        } catch (error) {
            // Gérer l'erreur ici
            console.log(error);
            throw new Error("Échec de la mise à jour de la salle de jeu. Veuillez réessayer plus tard.");
        }
    }
}