import { Request, Response } from 'express';
import { StorageService } from '../services/storageService';
import { Event } from '../models/Event';

export class EventController {
    private storageService: StorageService;

    constructor() {
        this.storageService = new StorageService();
    }

    public async getEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await this.storageService.getEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving events', error });
        }
    }

    public async addEvent(req: Request, res: Response): Promise<void> {
        const eventData: Event = req.body;

        try {
            const newEvent = await this.storageService.saveEvent(eventData);
            res.status(201).json(newEvent);
        } catch (error) {
            res.status(500).json({ message: 'Error adding event', error });
        }
    }

    public async updateEvent(req: Request, res: Response): Promise<void> {
        const eventId = req.params.id;
        const eventData: Event = req.body;

        try {
            const updatedEvent = await this.storageService.updateEvent(eventId, eventData);
            if (updatedEvent) {
                res.status(200).json(updatedEvent);
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating event', error });
        }
    }
}