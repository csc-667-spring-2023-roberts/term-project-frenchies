import {TormWhereCondition} from '../torm.conditions';

export type FindFirstCondition = TormWhereCondition<{
    room_id?: number;
}>

export function FindFirstConditionToQuery(condition: FindFirstCondition): string {
    const queryOptions: Array<string> = [];

    if (condition.where.room_id) {
        queryOptions.push('room_id=$1');
    }

    return queryOptions.join(queryOptions.length === 1 ? '' : ' AND ');
}