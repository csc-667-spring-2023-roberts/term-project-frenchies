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
            conversationId: conversation.id,
        }
    })
    return messages;
}