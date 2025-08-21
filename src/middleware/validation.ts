import { Request, Response, NextFunction } from 'express';

export const validateJobData = (req: Request, res: Response, next: NextFunction) => {
    const { title, company, datePosted } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string.' });
    }

    if (!company || typeof company !== 'string') {
        return res.status(400).json({ error: 'Company is required and must be a string.' });
    }

    if (!datePosted || isNaN(Date.parse(datePosted))) {
        return res.status(400).json({ error: 'Date Posted is required and must be a valid date.' });
    }

    next();
};

export const validateSearchQuery = (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Search query is required and must be a string.' });
    }

    next();
};