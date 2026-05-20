import { IUser } from "../user/user.interface";

export type IAdmin = IUser;

export interface IAdminResponse {
  data: IAdmin[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}