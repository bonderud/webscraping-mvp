export interface ScrapingTarget {
    id: number;
    url: string;
    lastScraped: Date | null;
}