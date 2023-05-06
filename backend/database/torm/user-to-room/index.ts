import db from '../../../services/database';
import {UserToRoomEntity} from '../../schemas/entities';
import {FindFirstCondition, FindFirstConditionToQuery} from './user-to-room.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class UserToRoomORM {
    public async Join(userId: number, roomId: number): Promise<UserToRoomEntity> {
        if (userId === null || userId === undefined || roomId === null || roomId === undefined) {
          return null as unknown as UserToRoomEntity;
        }
        const addedUserToRoom = await db.one(
          'insert into user-to-room (currentroom_id, user_id) values ($1, $2) returning id, currentroom_id, user_id',
          [roomId, userId]
        );
        return addedUserToRoom as UserToRoomEntity;
      }

    public async FindFirst(condition: FindFirstCondition): Promise<UserToRoomEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const room = await db.one(
                `SELECT id FROM user-to-room WHERE ${conditionQuery}`,
                [condition.where.id]
            );

            return room as UserToRoomEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }
}