import { ScrapingTarget } from '../models/ScrapingTarget';

export const scrapingConfig = {
    defaultScrapingInterval: 3600, // in seconds
    maxConcurrentScrapes: 5,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    scrapingTargets: [] as ScrapingTarget[],
};

export const addScrapingTarget = (url: string) => {
    const newTarget: ScrapingTarget = {
        id: scrapingConfig.scrapingTargets.length + 1,
        url,
        lastScraped: null,
    };
    scrapingConfig.scrapingTargets.push(newTarget);
};

export const updateScrapingTarget = (id: number, lastScraped: Date) => {
    const target = scrapingConfig.scrapingTargets.find(target => target.id === id);
    if (target) {
        target.lastScraped = lastScraped;
    }
};