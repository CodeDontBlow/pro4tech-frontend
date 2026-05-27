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