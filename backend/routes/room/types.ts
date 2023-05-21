export interface MessageListRO {
    messages: MessageRO[];
}

export interface MessageRO {
    senderUsername: string;
    isMe: boolean
    content: string;
}