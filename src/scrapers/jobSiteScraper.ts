import axios from 'axios';
import { JSDOM } from 'jsdom';
import BaseScraperService from './baseScraperService';
import Job from '../models/Job';
import StorageService from '../services/storageService';
import DuplicateDetectionService from '../services/duplicateDetectionService';

class JobSiteScraper extends BaseScraperService {
    private storageService: StorageService;
    private duplicateDetectionService: DuplicateDetectionService;

    constructor() {
        super();
        this.storageService = new StorageService();
        this.duplicateDetectionService = new DuplicateDetectionService();
    }

    async scrapeJobs(url: string): Promise<void> {
        try {
            const response = await axios.get(url);
            const dom = new JSDOM(response.data);
            const jobs = this.extractJobs(dom);

            for (const job of jobs) {
                const isDuplicate = await this.duplicateDetectionService.checkForDuplicates(job);
                if (!isDuplicate) {
                    await this.storageService.saveJob(job);
                }
            }
        } catch (error) {
            console.error('Error scraping jobs:', error);
        }
    }

    private extractJobs(dom: JSDOM): Job[] {
        const jobs: Job[] = [];
        const jobElements = dom.window.document.querySelectorAll('.job-listing'); // Adjust selector based on actual site structure

        jobElements.forEach(element => {
            const title = element.querySelector('.job-title')?.textContent || '';
            const company = element.querySelector('.company-name')?.textContent || '';
            const datePosted = element.querySelector('.date-posted')?.textContent || '';

            jobs.push(new Job({
                title,
                company,
                datePosted,
            }));
        });

        return jobs;
    }
}

export default JobSiteScraper;