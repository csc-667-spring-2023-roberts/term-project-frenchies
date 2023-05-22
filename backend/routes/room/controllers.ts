import { CardRoomEntity, RoomEntity } from '../../database/schemas/entities';
import {torm} from '../../database/torm';
import {buildMessageListRO} from './helpers';
import {UserSession} from '../../app.session';
import templateCard from '../../database/cards';
import { ApiError } from '../../app.errors';
import { StatusCodes } from 'http-status-codes';

export async function Create(userId: number) {
    const user = await torm.users.FindFirst({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const room = await torm.room.Create(`${user.username}'s room`);
    const conversation = await torm.conversation.Create(room.room_id); // TODO: maybe change this
    return room;
}

export async function Join(roomId: number, userId: number) {

    const room = await torm.room.FindFirst({
        where: {
            room_id: roomId
        }
    })

    if (!room) {
        return;
    }

    if (room.status === "inProgress") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Game already started")
    }

    return await torm.userToRoom.Join(userId, roomId);
}

export async function Leave(roomId: number, userId: number) {
    const deletedUserToRoom = await torm.userToRoom.Delete(userId, roomId);
    const cardsPlayer = await torm.cardRoom.FindAll({
        where: {
            room_id: roomId,
            user_id: userId
        }
    })

    if (!cardsPlayer) {
        return;
    }

    for (const card of cardsPlayer) {
        await torm.cardRoom.free(card.room_id, card.card_id)
    }
    return {
        message: `User ${userId} leaved room and his cards was free`
    };
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

export async function giveCardToUser(userId: number, numberOfCard: number, roomId: number) {
    const cards = await torm.cardRoom.FindAll({
        where: {
            room_id: roomId,
            status: 'available'
        }
    })

    if (!cards)  {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No more cards')
    }

    if (cards.length < numberOfCard) {
        numberOfCard = cards.length;
    }

    for (let i = 0; i < numberOfCard; i++) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const card = cards[randomIndex];
        await torm.cardRoom.assign(card.room_id, userId, card.card_id);
    }
}

export async function play(roomId: number, cardId: number, userId: number) {

    let roomInfo = await torm.room.FindFirst({
        where: {
            room_id: roomId
        }
    })

    if (roomInfo?.whoisplaying != userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Not your turn');
    }

    const users = await GetUsers(roomId);

    if (!users) {
        return;
    }

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex == -1) {
        return;
    }
    let nextIndex = (userIndex + 1) % users.length;
    let next = 1;

    if (cardId === -1) {
        await giveCardToUser(userId, 1, roomId)
    } else {

        const actual_card = templateCard.find((card) => card.card_id === roomInfo?.actual_card)
        const play_card = templateCard.find((card) => card.card_id === cardId)

        if (play_card?.color !== actual_card?.color && play_card?.value !== actual_card?.value) {
            throw new ApiError(StatusCodes.BAD_REQUEST, `Can't play this card`);
        }

        if (play_card?.value === "reverse") {
            roomInfo.order = 'DESC'
        }

        if (play_card?.value === "skip") {
            next = 2;
        }

        if (play_card?.value === "+2") {
            await giveCardToUser(nextIndex, 2, roomId);
        }

        if (play_card?.value === "+4") {
            await giveCardToUser(nextIndex, 4, roomId);
        }

        const played = await torm.cardRoom.play(roomId, cardId, -1);
        roomInfo.actual_card = cardId;
        roomInfo.actual_color =  actual_card!.color
    }

    if (roomInfo?.order === 'DESC') {
        users.reverse();
        nextIndex = (users.length - (userIndex + next)) % users.length;
    } else {
        nextIndex = (userIndex + next) % users.length;
    }

    const nextPlayer = users[nextIndex];

    const updatedRoom = await torm.room.Update(roomId, roomInfo.actual_card, nextPlayer.id, roomInfo.actual_color, 'inProgress', roomInfo.order);

    const playerInfos = await torm.cardRoom.countCardsPerUserInRoom(roomId);

    const result = {
        gameInfo : updatedRoom,
        playerInfos: playerInfos,
        actualCardInfo: templateCard.find((card) => card.card_id === updatedRoom.actual_card)
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

    if (!newCardSet || newCardSet.length === 0) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * newCardSet.length);
    const firstCard = newCardSet[randomIndex];

    const played = await torm.cardRoom.play(roomId, firstCard.card_id, -1);
    const updatedRoom = await torm.room.Update(roomId, firstCard.card_id, users[0]?.id, 'blue', 'inProgress', 'ASC');

   const result = await infosRoom(roomId);

    return result;
}

export async function myCards(roomId: number, userId: number) {

    const cards = await torm.cardRoom.FindAll({
        where:{
            room_id: roomId,
            user_id: userId
        }
    });

    if (!cards) {
        return [];
    }

    const cardIds = cards.map((card) => card.card_id);

    const filteredCards = templateCard.filter((card) => cardIds.includes(card.card_id));

    return filteredCards;
}

export async function infosRoom(roomId: number) {

    let result : {
        gameInfo: RoomEntity | null,
        playerInfos: any,
        actualCardInfo: any
    } = {
        gameInfo: null,
        playerInfos: null,
        actualCardInfo: null
    };

    const room = await torm.room.FindFirst({
        where: {
            room_id: roomId
        }
    });

    if (!room) {
        return;
    }

    result.gameInfo = room;
    result.actualCardInfo = templateCard.find((card) => card.card_id === room!.actual_card)

    const users = await torm.userToRoom.FindAll({
        where: {
            room_id: roomId
        }
    })

    if (!users) {
        return result;
    }

    const playerInfos = await torm.cardRoom.countCardsPerUserInRoom(roomId);
    for (const player of users) {
        const find = playerInfos.find((p) => p.userId === player.id)
        if (!find) {
            playerInfos.push({
                userId: player.id,
                cardCount: 0
            })
            if (result.gameInfo.status === 'inProgress') {
                result.gameInfo.order = 'finish'
                const updatedRoom = await torm.room.Update(roomId, room.actual_card, room.whoisplaying, room.actual_color, 'finish', room.order);
            }
        }
    }
    result.playerInfos = playerInfos

    return result;
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