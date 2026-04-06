export type UserRole = "ADMIN" | "AGENT" | "CLIENT";

export interface IUser {
  id: string;
  phone?: string;
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export type IUserCreateRequest = Omit<IUser, "id">;
export type IUserUpdateRequest = Partial<IUserCreateRequest> & { id: string };