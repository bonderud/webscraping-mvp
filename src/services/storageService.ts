import { Job } from '../models/Job';
import { Database } from '../database/connection';

export class StorageService {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    async saveJob(job: Job): Promise<void> {
        const existingJob = await this.getJobById(job.id);
        if (!existingJob) {
            await this.db.query('INSERT INTO jobs (id, title, company, datePosted) VALUES (?, ?, ?, ?)', 
                [job.id, job.title, job.company, job.datePosted]);
        }
    }

    async getJobs(): Promise<Job[]> {
        const results = await this.db.query('SELECT * FROM jobs');
        return results.map((row: any) => new Job(row.id, row.title, row.company, row.datePosted));
    }

    async updateJob(job: Job): Promise<void> {
        await this.db.query('UPDATE jobs SET title = ?, company = ?, datePosted = ? WHERE id = ?', 
            [job.title, job.company, job.datePosted, job.id]);
    }

    async getJobById(id: string): Promise<Job | null> {
        const result = await this.db.query('SELECT * FROM jobs WHERE id = ?', [id]);
        if (result.length > 0) {
            const row = result[0];
            return new Job(row.id, row.title, row.company, row.datePosted);
        }
        return null;
    }
}