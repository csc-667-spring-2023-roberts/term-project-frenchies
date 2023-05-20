import { CardRoomEntity } from '../../database/schemas/entities';
import {torm} from '../../database/torm';
import {buildMessageListRO} from './helpers';
import {UserSession} from '../../app.session';

export async function Create() {
    const room = await torm.room.Create('test');
    const conversation = await torm.conversation.Create(room.room_id); // TODO: maybe change this
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

export async function play(roomId: number, cardId: number, userId: number) {
    const played = await torm.cardRoom.play(roomId, cardId, -1);
    //TODO: GET ROOM
    const users = await GetUsers(roomId);

    if (!users) {
        return;
    }

    console.log(users);
    console.log(userId);

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex == -1) {
        return;
    }

    const nextIndex = (userIndex + 1) % users.length;
    const nextPlayer = users[nextIndex];

    console.log(nextPlayer);

    const updatedRoom = await torm.room.Update(roomId, cardId, nextPlayer.id, 'blue', 'inProgress');

    const playerInfos = await torm.cardRoom.countCardsPerUserInRoom(roomId);

    const result = {
        gameInfo : updatedRoom,
        playerInfos: playerInfos
    };

    return result;
}

export async function start(roomId: number) {
    const cards = await torm.cardRoom.Generate(roomId);

    const users = await GetUsers(roomId);
    const assignedCards: CardRoomEntity[] = [];
    if (!users) {
        return;
    }
    for (const user of users) {
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * cards.length);
            const card = cards[randomIndex];
            const assignedCard = {
                room_id: roomId,
                user_id: user.id,
                card_id: card.card_id,
                status: 'assigned',
            };
            assignedCards.push(assignedCard);
            cards.splice(randomIndex, 1);
        }
    }

    for (const card of assignedCards) {
        await torm.cardRoom.assign(card.room_id, card.user_id, card.card_id);
    }

    const newCardSet = await torm.cardRoom.FindAll({
        where: {
            status: 'available',
            room_id: roomId,
        }
    });

    console.log(newCardSet);

    if (!newCardSet || newCardSet.length === 0) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * newCardSet.length);
    const firstCard = newCardSet[randomIndex];

    const played = await torm.cardRoom.play(roomId, firstCard.card_id, -1);
    const updatedRoom = await torm.room.Update(roomId, firstCard.card_id, users[0]?.id, 'blue', 'inProgress');

    const playerInfos = await torm.cardRoom.countCardsPerUserInRoom(roomId);

    const result = {
        gameInfo : updatedRoom,
        playerInfos: playerInfos
    };

    return result;
}

export async function myCards(roomId: number, userId: number) {

    const cards = await torm.cardRoom.FindAll({
        where:{
            room_id: roomId,
            user_id: userId
        }
    });

    return cards;
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
            room_id: roomId,
        },
    });
}

export async function isUserInRoom(userId:number, roomId: number) {
    return await torm.userToRoom.isUserInRoom(userId, roomId);
}