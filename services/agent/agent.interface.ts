import { IUser } from "../user/user.interface";

export interface IAgent {
  id: string;
  supportLevel: string;
  canAnswer: boolean;
  user: IUser;
}

export interface IAgentResponse {
  data: IAgent[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}
