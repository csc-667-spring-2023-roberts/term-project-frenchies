import {TormWhereCondition} from '../torm.conditions';

export type FindFirstCondition = TormWhereCondition<{
    room_id?: number;
}>

export type FindAllCondition = TormWhereCondition<{
    room_id?: number;
    user_id?: number;
    status?: string;
}>


export function FindFirstConditionToQuery(condition: FindFirstCondition): string {
    const queryOptions: Array<string> = [];

    if (condition.where.room_id) {
        queryOptions.push('room_id=$1');
    }

    return queryOptions.join(queryOptions.length === 1 ? '' : ' AND ');
}

export function FindAllConditionToQuery(condition: FindAllCondition): string {
    const queryOptions: Array<string> = [];

    if (condition.where.room_id) {
        queryOptions.push('room_id=$1');
    }

    if (condition.where.user_id) {
        queryOptions.push('user_id=$2');
    }

    if (condition.where.status) {
        queryOptions.push('status=$3');
    }

    return queryOptions.join(queryOptions.length === 1 ? '' : ' AND ');
}