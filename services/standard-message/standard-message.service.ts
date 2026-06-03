import { api } from "../api";
import {
  IStandardMessage,
  IStandardMessageCreateRequest,
  IStandardMessageResponse,
  IStandardMessageUpdateRequest,
} from "./standard-message.interface";

type StandardMessageApiResponse =
  | IStandardMessage[]
  | {
      data?: IStandardMessage[];
      messages?: IStandardMessage[];
      standardMessages?: IStandardMessage[];
      meta?: {
        total?: number;
        page?: number;
        limit?: number;
        lastPage?: number;
      };
      total?: number;
      page?: number;
      limit?: number;
      lastPage?: number;
    };

function normalizeResponse(
  payload: StandardMessageApiResponse,
  page: number,
  limit: number,
): IStandardMessageResponse {
  if (Array.isArray(payload)) {
    const total = payload.length;

    return {
      data: payload,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  const data =
    payload.data ?? payload.messages ?? payload.standardMessages ?? [];
  const total = payload.meta?.total ?? payload.total ?? data.length;
  const currentPage = payload.meta?.page ?? payload.page ?? page;
  const currentLimit = payload.meta?.limit ?? payload.limit ?? limit;
  const lastPage =
    payload.meta?.lastPage ??
    payload.lastPage ??
    Math.max(1, Math.ceil(total / currentLimit));

  return {
    data,
    meta: {
      total,
      page: currentPage,
      limit: currentLimit,
      lastPage,
    },
  };
}

export async function getAll(
  page = 1,
  limit = 10,
  search?: string,
): Promise<IStandardMessageResponse> {
  const response = await api.get<StandardMessageApiResponse>(
    "/standard-messages",
    {
      params: {
        page,
        limit,
        ...(search?.trim() ? { search: search.trim() } : {}),
      },
    },
  );

  return normalizeResponse(response.data, page, limit);
}

export async function create(data: IStandardMessageCreateRequest) {
  const response = await api.post("/standard-messages", data);
  return response.data;
}

export async function update(id: string, data: IStandardMessageUpdateRequest) {
  const response = await api.patch(`/standard-messages/${id}`, data);
  return response.data;
}

export async function remove(id: string) {
  const response = await api.delete(`/standard-messages/${id}`);
  return response.data;
}
