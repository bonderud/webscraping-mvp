export interface Job {
    id: number;
    title: string;
    company: string;
    datePosted: Date;
    description?: string;
    location?: string;
}

export interface Search {
    id: number;
    query: string;
    createdAt: Date;
}

export interface ScrapingTarget {
    id: number;
    url: string;
    lastScraped: Date;
}