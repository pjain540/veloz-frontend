import { Permission } from "../common/types/permission"
import { Role } from "../common/types/role"

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    "ADMIN": ["CREATE_PRODUCT", "DELETE_PRODUCT", "UPDATE_PRODUCT", "CREATE_CATEGORY", "DELETE_CATEGORY", "UPDATE_CATEGORY", "DELETE_CUSTOMER", "UPDATE_CUSTOMER", "VIEW_CUSTOMER", "DELETE_ORDER", "UPDATE_ORDER", "VIEW_ORDER"],
} as const