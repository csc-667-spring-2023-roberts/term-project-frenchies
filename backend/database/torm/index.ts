import { CardRoomORM } from './card-room';
import { ConversationORM } from './conversations';
import { MessageORM } from './message';
import { RoomORM } from './rooms';
import { UserToRoomORM } from './user-to-room';
import {UsersORM} from './users';

export class Torm {
    public users = new UsersORM();
    public room = new RoomORM();
    public conversation = new ConversationORM();
    public userToRoom = new UserToRoomORM();
    public message = new MessageORM();
    public cardRoom = new CardRoomORM();
}

export const torm = new Torm();
