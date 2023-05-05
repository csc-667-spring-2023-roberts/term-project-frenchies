import db from '../../../services/database';
import {ConversationEntity} from '../../schemas/entities';
import {FindFirstCondition, FindFirstConditionToQuery} from './conversation.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class ConversationORM {
    public async Create(roomId: number): Promise<ConversationEntity> {
        const createdCoversation = await db.one(
            'insert into conversation (roomid) values ($1)', [roomId]
        );

        return createdCoversation as ConversationEntity;
    }

    public async FindFirst(condition: FindFirstCondition): Promise<ConversationEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const conversation = await db.one(
                `SELECT * FROM conversation WHERE ${conditionQuery}`,
                [condition.where.id, condition.where.roomid]
            );

            return conversation as ConversationEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }
}