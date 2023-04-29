import {TormWhereCondition} from '../torm.conditions';

export type FindFirstCondition = TormWhereCondition<{
    id?: number;
    username?: string;
}>

export function FindFirstConditionToQuery(condition: FindFirstCondition): string {
    const queryOptions: Array<string> = [];

    if (condition.where.id) {
        queryOptions.push('id=$1');
    }

    if (condition.where.username) {
        queryOptions.push('username=$2');
    }

    return queryOptions.join(queryOptions.length === 1 ? '' : ' AND ');
}