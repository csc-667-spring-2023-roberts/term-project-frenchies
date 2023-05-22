import {MessageListRO, MessageRO} from './types';
import {MessageUserEntity} from '../../database/schemas/entities';
import {UserSession} from '../../app.session';

export function buildMessageListRO(messages: MessageUserEntity[], user: UserSession): MessageListRO {
    return {
        messages: messages.map((msg) => {
            return {
                senderUsername: `Player ${msg.sender_id}`,
                isMe: msg.sender_id === user.id,
                content: msg.content,
            } as MessageRO;
        }),
    };
}