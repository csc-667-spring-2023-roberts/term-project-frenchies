export interface ConversationEntity {
  id: number
  room_id: number
}

export interface MessageUserEntity {
  content: string
  conv_id: number
  created_at: Date
  id: number
  sender_id: number
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

export interface UserToRoomEntity {
  currentroom_id: number
  id: number
  user_id: number
}

export interface UserEntity {
  id: number
  password: string
  username: string
}
