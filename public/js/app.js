document.addEventListener('DOMContentLoaded', () => {
    const scrapeButton = document.getElementById('scrape-button');
    const statusDisplay = document.getElementById('status-display');
    const jobList = document.getElementById('job-list');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    scrapeButton.addEventListener('click', async () => {
        statusDisplay.textContent = 'Scraping in progress...';
        const response = await fetch('/api/scrape/start', { method: 'POST' });
        const result = await response.json();
        statusDisplay.textContent = result.message;
    });

    const fetchJobs = async () => {
        const response = await fetch('/api/jobs');
        const jobs = await response.json();
        jobList.innerHTML = jobs.map(job => `<li>${job.title} at ${job.company}</li>`).join('');
    };

    fetchJobs();

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = searchInput.value;
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const results = await response.json();
        jobList.innerHTML = results.map(job => `<li>${job.title} at ${job.company}</li>`).join('');
    });
});