import { IUser } from "../user/user.interface";

export interface ISupportGroup {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAgent {
  id: string;
  supportLevel: string;
  canAnswer: boolean;
  user: IUser;
  supportGroups?: ISupportGroup[];
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