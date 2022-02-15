export type UserRole = 'Admin' | 'User' | 'Pending' | 'Delete';

export interface UserInfo {
  id: number;
  username: string;
  role: UserRole;
}

export interface UserRoleTooltip {
  id: string;
  role: UserRole;
}
