export interface ITicketSubject {
  id: string;
  name: string;
  description?: string;
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

export type ITicketSubjectCreateRequest = {
  name: string;
  description: string;
};
export type ITicketSubjectUpdateRequest = Partial<
  Pick<ITicketSubject, "name" | "description" | "isActive">
>;
