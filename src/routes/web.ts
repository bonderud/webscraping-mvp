import { Router } from 'express';
import { ScrapeController } from '../controllers/scrapeController';
import { JobController } from '../controllers/jobController';
import { SearchController } from '../controllers/searchController';

const router = Router();

const scrapeController = new ScrapeController();
const jobController = new JobController();
const searchController = new SearchController();

// Web routes
router.get('/', (req, res) => {
    res.render('dashboard');
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.get('/results', (req, res) => {
    res.render('results');
});

// Scraping routes
router.post('/start-scraping', scrapeController.startScraping);
router.get('/scraping-status', scrapeController.getScrapingStatus);

// Job management routes
router.get('/jobs', jobController.getJobs);
router.post('/jobs', jobController.addJob);
router.put('/jobs/:id', jobController.updateJob);

// Search routes
router.post('/search', searchController.performSearch);
router.get('/search/results', searchController.getSearchResults);

export function setWebRoutes(app) {
    app.use('/', router);
}