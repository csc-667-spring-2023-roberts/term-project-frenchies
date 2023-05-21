import {torm} from '../../database/torm';
import {buildMessageListRO} from './helpers';
import {UserSession} from '../../app.session';

export async function Create() {
    const room = await torm.room.Create();
    await torm.conversation.Create(room.id);

    return room;
}

export async function Join(roomId: number, userId: number) {
    return await torm.userToRoom.Join(userId, roomId);
}

export async function SendMessage(roomId: number, content: string, senderId: number) {
    const conversation = await torm.conversation.FindFirst({
        where: {
            roomid: roomId,
        },
    });

    if (!conversation) {
        return null;
    }

    return await torm.message.Create(conversation.id, content, senderId);
}

export async function FindAll() {
    return await torm.room.FindAll();
}

export async function GetMessages(roomId: number, user: UserSession) {
    const conversation = await torm.conversation.FindFirst({
        where: {
            roomid: roomId,
        },
    });

    // TODO: Fix this way of handling errors.
    if (!conversation) {
        return null;
    }

    const messages = await torm.message.FindAll({
        where: {
            conv_id: conversation.id,
        },
    });

    // TODO: Fix this way of handling errors.
    if (!messages) {
        return null;
    }

    return buildMessageListRO(messages, user);
}

export async function GetUsers(roomId: number) {
    return await torm.userToRoom.FindAll({
        where: {
            currentroom_id: roomId,
        },
    });
}

export async function isUserInRoom(userId:number, roomId: number) {
    return await torm.userToRoom.isUserInRoom(userId, roomId);
}