import { IUser } from "../user/user.interface";

export interface IAdmin {
  id: string;
  user: IUser;
}

export interface IAdminResponse {
  data: IAdmin[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}