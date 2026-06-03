export interface IStandardMessage {
  id: string;
  agentId: string;
  companyId: string;
  title: string;
  trigger: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IStandardMessageResponse {
  data: IStandardMessage[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export type IStandardMessageCreateRequest = Pick<
  IStandardMessage,
  "title" | "trigger" | "content"
>;

export type IStandardMessageUpdateRequest = Partial<IStandardMessageCreateRequest>;
