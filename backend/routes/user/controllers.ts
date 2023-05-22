import {torm} from '../../database/torm';
import {buildUserCreationRO, buildUserLoginRO} from './helpers';
import {hashPassword, verifyPassword} from '../../utils/password';
import {ApiError} from '../../app.errors';
import {StatusCodes} from 'http-status-codes';

export async function Create(username: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const user = await torm.users.Create(username, hashedPassword);

    return buildUserCreationRO(user);
}

export async function Login(username: string, password: string) {
    const user = await torm.users.FindFirst({
        where: {
            username: username,
        },
    });

    if (!user || !await verifyPassword(password, user.password)) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid username or password');
    }

    return buildUserLoginRO(user);
}

export async function Get(userID: number) {
    const user = await torm.users.FindFirst({
        where: {
            id: userID,
        },
    });

    if (!user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not found');
    }

    return buildUserLoginRO(user);
}
