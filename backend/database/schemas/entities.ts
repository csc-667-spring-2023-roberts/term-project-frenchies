export interface PgmigrationEntity {
  id: number
  name: string
  run_on: Date
}

export interface SessionEntity {
  created_at: Date
  expire: Date | null
  sess: any
  sid: string
}

export interface UserEntity {
  id: number
  password: string
  username: string
}
