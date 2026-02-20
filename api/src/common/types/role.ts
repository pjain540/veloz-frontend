export const ROLES = ["ADMIN"] as const

export type Role = (typeof ROLES)[number]
