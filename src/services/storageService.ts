import connection from '../database/connection';
import { Event } from '../models/Event';

export class StorageService {
    private db = connection;

    async saveEvent(event: Event): Promise<void> {
        const existingEvent = await this.getEventById(event.id);
        if (!existingEvent) {
            await this.db.query('INSERT INTO events (id, name, date, location, category, price, description, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [event.id, event.name, event.date, event.location, event.category, event.price, event.description, event.url]);
        }
    }

    async getEvents(): Promise<Event[]> {
        const results = await this.db.query('SELECT * FROM events');
        return results.map((row: any) => ({
            id: row.id,
            name: row.name,
            date: row.date,
            location: row.location,
            category: row.category,
            price: row.price,
            description: row.description,
            url: row.url
        }));
    }

    async updateEvent(event: Event): Promise<void> {
        await this.db.query('UPDATE events SET name = ?, date = ?, location = ?, category = ?, price = ?, description = ?, url = ? WHERE id = ?', 
            [event.name, event.date, event.location, event.category, event.price, event.description, event.url, event.id]);
    }

    async getEventById(id: number): Promise<Event | null> {
        const result = await this.db.query('SELECT * FROM events WHERE id = ?', [id]);
        if (result.length > 0) {
            const row = result[0];
            return {
                id: row.id,
                name: row.name,
                date: row.date,
                location: row.location,
                category: row.category,
                price: row.price,
                description: row.description,
                url: row.url
            };
        }
        return null;
    }
}