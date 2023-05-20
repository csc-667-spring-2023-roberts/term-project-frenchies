import db from '../../../services/database';
import {CardRoomEntity, RoomEntity} from '../../schemas/entities';
import {FindAllCondition, FindAllConditionToQuery, FindFirstCondition, FindFirstConditionToQuery} from './card-room.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class CardRoomORM {
    public async Generate(roomId: number): Promise<CardRoomEntity[]> {
        const cards = await db.any(
            `INSERT INTO card_room (room_id, user_id, card_id, status)
            VALUES
            ($1, -1, 1, 'available'),
            ($1, -1, 2, 'available'),
            ($1, -1, 3, 'available'),
            ($1, -1, 4, 'available'),
            ($1, -1, 5, 'available'),
            ($1, -1, 6, 'available'),
            ($1, -1, 7, 'available'),
            ($1, -1, 8, 'available'),
            ($1, -1, 9, 'available'),
            ($1, -1, 10, 'available'),
            ($1, -1, 11, 'available'),
            ($1, -1, 12, 'available'),
            ($1, -1, 13, 'available'),
            ($1, -1, 14, 'available'),
            ($1, -1, 15, 'available'),
            ($1, -1, 16, 'available'),
            ($1, -1, 17, 'available'),
            ($1, -1, 18, 'available'),
            ($1, -1, 19, 'available'),
            ($1, -1, 20, 'available'),
            ($1, -1, 21, 'available'),
            ($1, -1, 22, 'available'),
            ($1, -1, 23, 'available'),
            ($1, -1, 24, 'available'),
            ($1, -1, 25, 'available'),
            ($1, -1, 26, 'available'),
            ($1, -1, 27, 'available'),
            ($1, -1, 28, 'available'),
            ($1, -1, 29, 'available'),
            ($1, -1, 30, 'available'),
            ($1, -1, 31, 'available'),
            ($1, -1, 32, 'available'),
            ($1, -1, 33, 'available'),
            ($1, -1, 34, 'available'),
            ($1, -1, 35, 'available'),
            ($1, -1, 36, 'available'),
            ($1, -1, 37, 'available'),
            ($1, -1, 38, 'available'),
            ($1, -1, 39, 'available'),
            ($1, -1, 40, 'available'),
            ($1, -1, 41, 'available'),
            ($1, -1, 42, 'available'),
            ($1, -1, 43, 'available'),
            ($1, -1, 44, 'available'),
            ($1, -1, 45, 'available'),
            ($1, -1, 46, 'available'),
            ($1, -1, 47, 'available'),
            ($1, -1, 48, 'available'),
            ($1, -1, 49, 'available'),
            ($1, -1, 50, 'available'),
            ($1, -1, 51, 'available'),
            ($1, -1, 52, 'available'),
            ($1, -1, 53, 'available'),
            ($1, -1, 54, 'available'),
            ($1, -1, 55, 'available'),
            ($1, -1, 56, 'available'),
            ($1, -1, 57, 'available'),
            ($1, -1, 58, 'available'),
            ($1, -1, 59, 'available'),
            ($1, -1, 60, 'available'),
            ($1, -1, 61, 'available'),
            ($1, -1, 62, 'available'),
            ($1, -1, 63, 'available'),
            ($1, -1, 64, 'available'),
            ($1, -1, 65, 'available'),
            ($1, -1, 66, 'available'),
            ($1, -1, 67, 'available'),
            ($1, -1, 68, 'available'),
            ($1, -1, 69, 'available'),
            ($1, -1, 70, 'available'),
            ($1, -1, 71, 'available'),
            ($1, -1, 72, 'available'),
            ($1, -1, 73, 'available'),
            ($1, -1, 74, 'available'),
            ($1, -1, 75, 'available'),
            ($1, -1, 76, 'available'),
            ($1, -1, 77, 'available'),
            ($1, -1, 78, 'available'),
            ($1, -1, 79, 'available'),
            ($1, -1, 80, 'available'),
            ($1, -1, 81, 'available'),
            ($1, -1, 82, 'available'),
            ($1, -1, 83, 'available'),
            ($1, -1, 84, 'available'),
            ($1, -1, 85, 'available'),
            ($1, -1, 86, 'available'),
            ($1, -1, 87, 'available'),
            ($1, -1, 88, 'available'),
            ($1, -1, 89, 'available'),
            ($1, -1, 90, 'available'),
            ($1, -1, 91, 'available'),
            ($1, -1, 92, 'available'),
            ($1, -1, 93, 'available'),
            ($1, -1, 94, 'available'),
            ($1, -1, 95, 'available'),
            ($1, -1, 96, 'available'),
            ($1, -1, 97, 'available'),
            ($1, -1, 98, 'available'),
            ($1, -1, 99, 'available'),
            ($1, -1, 100, 'available'),
            ($1, -1, 101, 'available'),
            ($1, -1, 102, 'available'),
            ($1, -1, 103, 'available'),
            ($1, -1, 104, 'available'),
            ($1, -1, 105, 'available'),
            ($1, -1, 106, 'available'),
            ($1, -1, 107, 'available'),
            ($1, -1, 108, 'available')
            RETURNING room_id, user_id, card_id, status`,
            [roomId],
        );

        return cards as CardRoomEntity[];
    }

    public async assign(roomId: number, userId: number, cardId: number) {
        const card = await db.one(
            `UPDATE card_room
            SET status = 'assigned', user_id = $2
            WHERE room_id = $1
              AND card_id = $3
              RETURNING room_id, card_id, user_id, status`,
            [roomId, userId, cardId]
        );
        return card as CardRoomEntity;
    }

    public async countCardsPerUserInRoom(roomId: number): Promise<{ userId: number, cardCount: number }[]> {
        try {
          const result = await db.any(
            `SELECT user_id, COUNT(*) AS card_count
            FROM card_room
            WHERE room_id = $1 AND status = 'assigned'
            GROUP BY user_id`,
            [roomId]
          );

          return result.map((row: any) => ({
            userId: row.user_id,
            cardCount: row.card_count,
          }));
        } catch (e) {
          if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
            return []; // Si aucune donnée n'est trouvée, renvoie un tableau vide
          }

          throw e;
        }
      }

    public async play(roomId: number, cardId: number, userId: number) {
        const card = await db.one(
            `UPDATE card_room
            SET status = 'played', user_id = $3
            WHERE room_id = $1
              AND card_id = $2
              RETURNING room_id, card_id, user_id, status`,
            [roomId, cardId, userId]
        );
        return card as CardRoomEntity;
    }


    public async FindFirst(condition: FindFirstCondition): Promise<CardRoomEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const cardroom = await db.one(
                `SELECT room_id FROM rooms WHERE ${conditionQuery}`,
                [condition.where.room_id]
            );

            return cardroom as CardRoomEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }

    public async FindAll(condition: FindAllCondition): Promise<CardRoomEntity[] | null> {
        try {
            const conditionQuery = FindAllConditionToQuery(condition);
            const cards = await db.any(
                `SELECT *
                FROM card_room
                WHERE ${conditionQuery}
                `,
                [condition.where.room_id, condition.where.user_id, condition.where.status]
            );

            return cards as CardRoomEntity[];
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }
}