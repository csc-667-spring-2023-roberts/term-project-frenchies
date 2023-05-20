export interface CardEntity {
  card_id: number
  color: string
  value: string
}

export interface CardRoomEntity {
  card_id: number
  player_id: number
  status: string
}

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

export interface PlayerEntity {
  player_id: number
  room_id: number
  user_id: number
}

export interface RoomPlayerEntity {
  player_id: number
  room_id: number
}

export interface RoomEntity {
  actual_card: number
  actual_color: string
  name: string
  order: string
  room_id: number
  status: string
  whoisplaying: number
}

export interface ScoreboardEntity {
  room_id: number
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
