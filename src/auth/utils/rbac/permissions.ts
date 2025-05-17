// import { ROLES } from "./roles";
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    USER: 'user',
} as const;

export const USER_PERMISSIONS = {
    GET_OWN_DATA: "user:get_own_data",
    GET_OTHER_DATA: "user:get_other_data",
    UPDATE_OWN_DATA: "user:update_own_data",
    UPDATE_OTHER_DATA: "user:update_other_data",
    DELETE_OWN: "user:delete_own",
    DELETE_OTHER: "user:delete_other",
  } as const;
  
  export const PROJECT_PERMISSIONS = {
    CREATE: "project:create",
    GET_OWN: "project:get_own",
    GET_ALL: "project:get_all",
    UPDATE_OWN: "project:update_own",
    UPDATE_ANY: "project:update_any",
    UPDATE_OTHER:"project:update_OTHER",
    DELETE_OWN: "project:delete_own",
    DELETE_ANY: "project:delete_any",
  } as const;
  
  export const DESIGN_PERMISSIONS = {
    CREATE_UIUX: "design:create_uiux",
    VIEW_UIUX: "design:view_uiux",
    UPDATE_UIUX: "design:update_uiux",
    DELETE_UIUX: "design:delete_uiux",
  } as const;
  
  export const BACKEND_PERMISSIONS = {
    CREATE_BACKEND: "backend:create",
    VIEW_BACKEND: "backend:view",
    UPDATE_BACKEND: "backend:update",
    DELETE_BACKEND: "backend:delete",
  } as const;
  

  