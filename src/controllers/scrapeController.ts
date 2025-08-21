export class ScrapeController {
    private scrapingInProgress: boolean = false;

    public startScraping(req, res) {
        if (this.scrapingInProgress) {
            return res.status(400).json({ message: "Scraping is already in progress." });
        }

        this.scrapingInProgress = true;

        // Simulate scraping process
        setTimeout(() => {
            this.scrapingInProgress = false;
            res.status(200).json({ message: "Scraping completed successfully." });
        }, 5000); // Simulate a 5-second scraping process
    }

    public getScrapingStatus(req, res) {
        res.status(200).json({ scrapingInProgress: this.scrapingInProgress });
    }
}