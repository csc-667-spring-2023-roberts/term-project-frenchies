import {torm} from '../../database/torm';

export async function Create() {
    const room = await torm.room.Create();
    const conversation = await torm.conversation.Create(room.id); // TODO: maybe change this
    return room;
}

export async function Join(roomId: number, userId: number) {
    const addedUserToRoom = await torm.userToRoom.Join(userId, roomId);
    return addedUserToRoom;
}

export async function SendMessage(roomId: number, content: string, senderId: number) {
    const conversation = await torm.conversation.FindFirst({
        where: {
            roomid: roomId,
        },
    })

    if (!conversation) {
        return null;
    }

    const sendedMessage = await torm.message.Create(conversation.id, content, senderId)
    return sendedMessage;
}

export async function FindAll() {
    const rooms = await torm.room.FindAll();
    return rooms;
}

export async function GetMessages(roomId: number) {

    const conversation = await torm.conversation.FindFirst({
        where: {
            roomid: roomId,
        },
    })

    if (!conversation) {
        return null;
    }

    const messages = await torm.message.FindAll({
        where: {
            conv_id: conversation.id,
        }
    })
    return messages;
}

export async function GetUsers(roomId: number) {

    const users = await torm.userToRoom.FindAll({
        where: {
            currentroom_id: roomId,
        }
    })
    return users;
}

export async function isUserInRoom(userId:number, roomId: number) {
    return await torm.userToRoom.isUserInRoom(userId, roomId);
}