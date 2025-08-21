import { Router } from 'express';
import ScrapeController from '../controllers/scrapeController';
import JobController from '../controllers/jobController';
import SearchController from '../controllers/searchController';

const router = Router();

const scrapeController = new ScrapeController();
const jobController = new JobController();
const searchController = new SearchController();

// Scraping routes
router.post('/scrape/start', scrapeController.startScraping);
router.get('/scrape/status', scrapeController.getScrapingStatus);

// Job routes
router.get('/jobs', jobController.getJobs);
router.post('/jobs', jobController.addJob);
router.put('/jobs/:id', jobController.updateJob);

// Search routes
router.post('/search', searchController.performSearch);
router.get('/search/results', searchController.getSearchResults);

export default router;