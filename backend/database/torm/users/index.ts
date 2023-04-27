import db from '../../../services/database';
import {UserEntity} from '../../schemas/entities';
import {FindFirstCondition, FindFirstConditionToQuery} from './users.conditions';
import pgPromise from 'pg-promise';
import QueryResultError = pgPromise.errors.QueryResultError;
import queryResultErrorCode = pgPromise.errors.queryResultErrorCode;

export class UsersORM {
    public async Create(username: string, password: string): Promise<UserEntity> {
        const createdUser = await db.one(
            'insert into users (username, password) values ($1, $2) returning id, username, password',
            [username, password]
        );

        return createdUser as UserEntity;
    }

    public async FindFirst(condition: FindFirstCondition): Promise<UserEntity | null> {
        try {
            const conditionQuery = FindFirstConditionToQuery(condition);
            const user = await db.one(
                `SELECT id, username, password FROM users WHERE ${conditionQuery}`,
                [condition.where.id, condition.where.username]
            );

            return user as UserEntity;
        } catch (e) {
            if (e instanceof QueryResultError && e.code === queryResultErrorCode.noData) {
                return null;
            }

            throw e;
        }
    }
}