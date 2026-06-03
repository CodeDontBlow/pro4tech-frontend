export interface IDashboardOverviewResponse {
    totalOpenTickets: number;
    totalClosedTickets: number;
    totalInProgressTickets: number;
    totalReopenedTickets: number;
    avgFirstResponseMinutes: number;
    avgFirstResponseLabel: string;
    avgResolutionMinutes: number;
    avgResolutionLabel: string;
    satisfactionDistribution: {
        score: number;
        count: number;
    }[];
    volumeByHour: {
        hour: number;
        count: number;
    }[];
}

export interface IAgentPerformance {
    agentId: string;
    agentName: string;
    closedCount: number;
    avgFirstResponseMinutes: number;
    avgFirstResponseLabel: string;
    avgResolutionMinutes: number;
    avgResolutionLabel: string;
    ratingAverage: number | null;
    ratingCount: number;
}

export interface IDashboardAgentsResponse {
    data: IAgentPerformance[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}

export interface ICompanyPerformance {
    companyId: string;
    companyName: string;
    ticketCount: number;
    ratingAverage: number | null;
    ratingCount: number;
}

export interface IDashboardCompaniesResponse {
    data: ICompanyPerformance[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}