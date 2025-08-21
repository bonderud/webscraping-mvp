import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Job } from '../models/Job';
import { ScrapingTarget } from '../models/ScrapingTarget';
import { StorageService } from './storageService';
import { DuplicateDetectionService } from './duplicateDetectionService';

export class ScraperService {
    private storageService: StorageService;
    private duplicateDetectionService: DuplicateDetectionService;

    constructor() {
        this.storageService = new StorageService();
        this.duplicateDetectionService = new DuplicateDetectionService();
    }

    public async scrapeJobs(target: ScrapingTarget): Promise<void> {
        try {
            const response = await axios.get(target.url);
            const dom = new JSDOM(response.data);
            const jobs = this.extractJobs(dom.window.document);

            for (const job of jobs) {
                const isDuplicate = await this.duplicateDetectionService.checkForDuplicates(job);
                if (!isDuplicate) {
                    await this.storageService.saveJob(job);
                }
            }

            target.lastScraped = new Date();
            await this.storageService.updateScrapingTarget(target);
        } catch (error) {
            console.error(`Error scraping jobs from ${target.url}:`, error);
        }
    }

    private extractJobs(document: Document): Job[] {
        const jobElements = document.querySelectorAll('.job-listing'); // Adjust selector based on actual site structure
        const jobs: Job[] = [];

        jobElements.forEach(element => {
            const title = element.querySelector('.job-title')?.textContent || '';
            const company = element.querySelector('.company-name')?.textContent || '';
            const datePosted = new Date(element.querySelector('.date-posted')?.textContent || '');

            jobs.push(new Job({ title, company, datePosted }));
        });

        return jobs;
    }

    public async scrapeTarget(target: ScrapingTarget): Promise<void> {
        await this.scrapeJobs(target);
    }
}