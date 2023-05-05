export interface ConversationEntity {
  id: number
  Roomid: number
}

/* TODO: I think we don't need RoomId but SenderId (user)
  conversationId: number
  senderId: number
  created_at: Date
  id: number
*/
export interface MessageUserEntity {
  Convid: number
  created_at: Date
  id: number
  Roomid: number
}

export interface PgmigrationEntity {
  id: number
  name: string
  run_on: Date
}

export interface RoomEntity {
  id: number
}

export interface SessionEntity {
  created_at: Date
  expire: Date | null
  sess: any
  sid: string
}


/*TODO: add userId ?
  currentRoom_id: number
  userId: number
  id: number
*/
export interface UserToRoomEntity {
  CurrentRoomid: number
  id: number
}

export interface UserEntity {
  id: number
  password: string
  username: string
}
