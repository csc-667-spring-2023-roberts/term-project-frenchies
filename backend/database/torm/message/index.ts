import db from '../../../services/database';
import {MessageUserEntity} from '../../schemas/entities';
import {FindAllCondition, FindAllConditionToQuery, FindFirstCondition, FindFirstConditionToQuery} from './message.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class MessageORM {
    public async Create(conversationId: number, content: string, senderId: number): Promise<MessageUserEntity> {
        const createdMessage = await db.one(
            'insert into message_user (conv_id, sender_id, content) values ($1, $2, $3) returning id, conv_id, sender_id, content',
            [conversationId, senderId, content]
        );

        return createdMessage as MessageUserEntity;
    }

    public async FindAll(condition: FindAllCondition): Promise<MessageUserEntity[] | null> {
        try {
            const conditionQuery = FindAllConditionToQuery(condition);
            const messages = await db.any(
                `SELECT mu.id, mu.content, mu.sender_id, u.username as sender_username, mu.created_at
                FROM message_user AS mu
                JOIN users AS u ON mu.sender_id = u.id
                WHERE ${conditionQuery}
                `,
                [condition.where.conv_id]
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