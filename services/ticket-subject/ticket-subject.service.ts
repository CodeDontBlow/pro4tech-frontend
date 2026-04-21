import { api } from "../api";
import {
  ITicketSubject,
  ITicketSubjectCreateRequest,
  ITicketSubjectResponse,
} from "./ticket-subject.interface";

type TicketSubjectApiResponse =
  | ITicketSubject[]
  | {
      data?: ITicketSubject[];
      subjects?: ITicketSubject[];
      ticketSubjects?: ITicketSubject[];
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
  payload: TicketSubjectApiResponse,
  page: number,
  limit: number,
): ITicketSubjectResponse {
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
    payload.data ?? payload.subjects ?? payload.ticketSubjects ?? [];
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
): Promise<ITicketSubjectResponse> {
  const response = await api.get<TicketSubjectApiResponse>("/ticket-subjects", {
    params: {
      page,
      limit,
      isActive: true,
    },
  });

  return normalizeResponse(response.data, page, limit);
}

export async function create(data: ITicketSubjectCreateRequest) {
  const response = await api.post("/ticket-subjects", data);
  return response.data;
}

export async function remove(id: string) {
  const response = await api.delete(`/ticket-subjects/${id}`);
  return response.data;
}
