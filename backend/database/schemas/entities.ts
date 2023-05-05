export interface ConversationEntity {
  id: number
  Roomid: number
}

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

export interface UserToRoomEntity {
  CurrentRoomid: number
  id: number
}

export interface UserEntity {
  id: number
  password: string
  username: string
}
