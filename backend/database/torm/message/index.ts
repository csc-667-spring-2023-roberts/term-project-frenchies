import db from '../../../services/database';
import {MessageUserEntity} from '../../schemas/entities';
import {FindAllCondition, FindAllConditionToQuery, FindFirstCondition, FindFirstConditionToQuery} from './message.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class MessageORM {
    public async Create(conversationId: number, content: string, senderId: number): Promise<MessageUserEntity> {
        const createdMessage = await db.one(
            'insert into message-user (conversationId, content, senderId) values ($1, $2, $3)',
            [conversationId, content, senderId]
        );

        return createdMessage as MessageUserEntity;
    }

    public async FindAll(condition: FindAllCondition): Promise<MessageUserEntity[] | null> {
        try {
            const conditionQuery = FindAllConditionToQuery(condition);
            const messages = await db.one(
                `SELECT * FROM message-user WHERE ${conditionQuery}`,
                [condition.where.conversationId]
            );

            return messages as MessageUserEntity[];
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }

    public async FindFirst(condition: FindFirstCondition): Promise<MessageUserEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const room = await db.one(
                `SELECT id FROM message-user WHERE ${conditionQuery}`,
                [condition.where.id]
            );

            return room as MessageUserEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }
}