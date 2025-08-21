import { Request, Response } from 'express';
import { StorageService } from '../services/storageService';
import { Job } from '../models/Job';

export class JobController {
    private storageService: StorageService;

    constructor() {
        this.storageService = new StorageService();
    }

    public async getJobs(req: Request, res: Response): Promise<void> {
        try {
            const jobs = await this.storageService.getJobs();
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving jobs', error });
        }
    }

    public async addJob(req: Request, res: Response): Promise<void> {
        const jobData: Job = req.body;

        try {
            const newJob = await this.storageService.saveJob(jobData);
            res.status(201).json(newJob);
        } catch (error) {
            res.status(500).json({ message: 'Error adding job', error });
        }
    }

    public async updateJob(req: Request, res: Response): Promise<void> {
        const jobId = req.params.id;
        const jobData: Job = req.body;

        try {
            const updatedJob = await this.storageService.updateJob(jobId, jobData);
            if (updatedJob) {
                res.status(200).json(updatedJob);
            } else {
                res.status(404).json({ message: 'Job not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating job', error });
        }
    }
}