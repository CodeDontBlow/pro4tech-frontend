export interface ITicketSubject {
  id: string;
  name: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ITicketSubjectResponse {
  data: ITicketSubject[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export type ITicketSubjectCreateRequest = Pick<ITicketSubject, "name">;
