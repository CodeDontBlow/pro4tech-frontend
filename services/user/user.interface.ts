import { UserRole, ChatStatus } from "./user.type";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  password?: string;
  role: UserRole;
  chatStatus: ChatStatus;
  isActive: boolean;
  lastSeen?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type IUserCreateRequest = Omit<IUser, "id">;
export type IUserUpdateRequest = Partial<IUserCreateRequest> & { id: string };
export type IUserSummary = Pick<IUser, "id" | "name">