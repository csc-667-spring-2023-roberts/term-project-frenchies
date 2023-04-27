import {UserCreationRO} from './types';
import {UserEntity} from '../../database/schemas/entities';

export function buildUserCreationRO({id, username}: UserEntity): UserCreationRO {
    return {
        id,
        username,
    };
}

export function buildUserLoginRO({id, username}: UserEntity): UserCreationRO {
    return {
        id,
        username,
    };
}