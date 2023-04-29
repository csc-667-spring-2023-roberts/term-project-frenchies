import {UsersORM} from './users';

export class Torm {
    public users = new UsersORM();
}

export const torm = new Torm();
