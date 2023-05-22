import db from '../../../services/database';
import {UserToRoomEntity} from '../../schemas/entities';
import {FindAllCondition, FindAllConditionToQuery, FindFirstCondition, FindFirstConditionToQuery} from './user-to-room.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class UserToRoomORM {
    public async Join(userId: number, roomId: number): Promise<UserToRoomEntity> {
        const addedUserToRoom = await db.one(
            'insert into user_to_room (room_id, user_id) values ($1, $2) returning id, room_id, user_id',
            [roomId, userId]
        );

        return addedUserToRoom as UserToRoomEntity;
    }

    public async isUserInRoom(userId: number, roomId: number): Promise<boolean> {
        const userInRoom = await this.FindFirst({
            where: {
                room_id: roomId,
                user_id: userId
            }
        });

        if (userInRoom === null) {
            return false;
        }

        return true;
    }

    public async FindFirst(condition: FindFirstCondition): Promise<UserToRoomEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const room = await db.one(
                `SELECT id FROM user_to_room WHERE ${conditionQuery}`,
                [condition.where.room_id, condition.where.user_id]
            );

            return room as UserToRoomEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }

    public async Delete(userId: number, roomId: number): Promise<void> {
        await db.none(
            'DELETE FROM user_to_room WHERE room_id = $1 AND user_id = $2',
            [roomId, userId]
        );
    }

    public async FindAll(condition: FindAllCondition): Promise<UserToRoomEntity[] | null> {
        try {
            const conditionQuery = FindAllConditionToQuery(condition);
            const users = await db.any(
                `SELECT u.username, u.id, utr.room_id AS room_id
                FROM user_to_room AS utr
                JOIN users AS u ON utr.user_id = u.id
                WHERE ${conditionQuery}
                `,
                [condition.where.room_id]
            );

            return users as UserToRoomEntity[];
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }
}