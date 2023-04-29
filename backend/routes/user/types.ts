import {Schema} from 'express-validator';

export const UserCreationDTO: Schema = {
    username: {
        isString: true,
        notEmpty: true,
    },
    password: {
        isString: true,
        notEmpty: true,
        matches: { options: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ },
    },
    passwordConfirmation: {
        isString: true,
        notEmpty: true,
        matches: { options: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ },
    },
};

export interface UserCreationRO {
    id: number;
    username: string;
}

export type UserLoginRO = UserCreationRO;
