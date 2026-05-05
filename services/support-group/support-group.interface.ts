export interface ISupportGroup {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ISupportGroupResponse {
  data: ISupportGroup[];
   meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

export type ISupportGroupCreateRequest = Omit<ISupportGroup, "id" | "createdAt" | "updatedAt" | "deletedAt">;
export type ISupportGroupUpdateRequest = Partial<ISupportGroupCreateRequest> & { id: string };
export type ISupportGroupSummary = Pick<ISupportGroup, "id" | "name">;