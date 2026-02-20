import { ROLE_PERMISSIONS } from "../../config/rolePermission";
import { Permission } from "../types/permission";
import { Role } from "../types/role";

export function hasPermission(role: Role, permission: Permission): boolean {
    return ROLE_PERMISSIONS[role].includes(permission)
}
