import axios from 'axios';
import { JSDOM } from 'jsdom';
import { BaseScraperService } from './baseScraperService';
import { Event } from '../models/Event';
import { StorageService } from '../services/storageService';
import { DuplicateDetectionService } from '../services/duplicateDetectionService';

class EventSiteScraper extends BaseScraperService {
    private storageService: StorageService;
    private duplicateDetectionService: DuplicateDetectionService;

    constructor() {
        super();
        this.storageService = new StorageService();
        this.duplicateDetectionService = new DuplicateDetectionService();
    }

    async scrapeEvents(url: string): Promise<void> {
        try {
            const response = await axios.get(url);
            const dom = new JSDOM(response.data);
            const events = this.extractEvents(dom);

            for (const event of events) {
                const isDuplicate = await this.duplicateDetectionService.checkForDuplicates(event.id.toString());
                if (!isDuplicate) {
                    await this.storageService.saveEvent(event);
                }
            }
        } catch (error) {
            console.error('Error scraping events:', error);
        }
    }

    private extractEvents(dom: JSDOM): Event[] {
        const events: Event[] = [];
        const eventElements = dom.window.document.querySelectorAll<HTMLElement>('.event-listing'); // Adjust selector based on actual site structure

        eventElements.forEach((element: HTMLElement) => {
            const name = element.querySelector('.event-name')?.textContent || '';
            const date = new Date(element.querySelector('.event-date')?.textContent || '');
            const location = element.querySelector('.event-location')?.textContent || '';
            const category = element.querySelector('.event-category')?.textContent || '';
            const price = element.querySelector('.event-price')?.textContent || '';
            const description = element.querySelector('.event-description')?.textContent || '';
            const url = element.querySelector('.event-url')?.getAttribute('href') || '';

            events.push({
                id: Date.now(), // Replace with a unique ID generator if available
                name,
                date,
                location,
                category,
                price,
                description,
                url
            });
        });

        return events;
    }
}

export default EventSiteScraper;