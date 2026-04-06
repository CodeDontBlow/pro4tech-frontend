import { IUser } from "../user/user.interface";

interface IAgent {
    id: string;
    supportLevel: string;
    canAnswer: boolean;
    user: IUser;
}

export interface IAgentResponse {
  agents: IAgent[];
  total: number;
  page: number;
  limit: number;
}
