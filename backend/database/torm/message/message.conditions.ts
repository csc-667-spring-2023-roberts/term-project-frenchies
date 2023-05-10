import {TormWhereCondition} from '../torm.conditions';

export type FindFirstCondition = TormWhereCondition<{
    id?: number;
}>

export type FindAllCondition = TormWhereCondition<{
    conv_id?: number;
}>

export function FindFirstConditionToQuery(condition: FindFirstCondition): string {
    const queryOptions: Array<string> = [];

    if (condition.where.id) {
        queryOptions.push('id=$1');
    }

    return queryOptions.join(queryOptions.length === 1 ? '' : ' AND ');
}

export function FindAllConditionToQuery(condition: FindAllCondition): string {
    const queryOptions: Array<string> = [];

    if (condition.where.conv_id) {
        queryOptions.push('conv_id=$1');
    }

    return queryOptions.join(queryOptions.length === 1 ? '' : ' AND ');
}