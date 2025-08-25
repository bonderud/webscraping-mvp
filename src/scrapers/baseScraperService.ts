export class BaseScraperService {
    protected async fetchHtml(url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch HTML from ${url}`);
        }
        return await response.text();
    }

    protected parseHtml(html: string): Document {
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    }

    protected extractData(document: Document): any[] {
        // This method should be overridden by subclasses to extract specific data
        return [];
    }

    public async scrape(url: string): Promise<any[]> {
        const html = await this.fetchHtml(url);
        const document = this.parseHtml(html);
        return this.extractData(document);
    }
}

export default BaseScraperService;