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
    limit: number;
    lastPage: number;
  };
}

export type ISupportGroupCreateRequest = Omit<ISupportGroup, "id" | "createdAt" | "updatedAt" | "deletedAt">;
export type ISupportGroupUpdateRequest = Partial<ISupportGroupCreateRequest> & { id: string };
