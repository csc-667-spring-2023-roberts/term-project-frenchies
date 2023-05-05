import db from '../../../services/database';
import {RoomEntity} from '../../schemas/entities';
import {FindFirstCondition, FindFirstConditionToQuery} from './room.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class RoomORM {
    public async Create(): Promise<RoomEntity> {
        const createdRoom = await db.one(
            'insert into rooms default values'
        );

        return createdRoom as RoomEntity;
    }

    public async FindFirst(condition: FindFirstCondition): Promise<RoomEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const room = await db.one(
                `SELECT id FROM rooms WHERE ${conditionQuery}`,
                [condition.where.id]
            );

            return room as RoomEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }
}