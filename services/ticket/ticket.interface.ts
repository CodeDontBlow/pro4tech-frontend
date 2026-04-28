import { ISupportGroupSummary } from "@/services/support-group/support-group.interface"
import { ICompanySummary } from "@/services/company/company.interface"
import { IUserSummary } from "@/services/user/user.interface"
import { ITicketSubjectSummary } from "../ticket-subject/ticket-subject.interface";

export interface ITicket { 
    id: string;
    ticketNumber: number;
    companyId: string;  
    clientId: string;
    agentId: string | null;
    supportGroupId: string;
    subjectId: string;
    status: string;
    priority: string;
    ratingScore: number | null;
    ratingComment: string | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isArchived: boolean;

    client: IUserSummary;
    agent: IUserSummary | null;
    company: ICompanySummary;
    subject: ITicketSubjectSummary;
    supportGroup: ISupportGroupSummary;
}

export interface ITicketResponse {
    data: ITicket[];
    meta: {
        total: number;
        page: number;
        limit: number;
        lastPage: number;
    }
}