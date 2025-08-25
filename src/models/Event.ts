export interface Event {
    id: number;
    name: string;
    date: Date;
    location: string;
    category: string;
    price?: string;
    description?: string;
    url: string;
}

export class EventModel {
    constructor(public event: Event) {}

    // Additional methods for event manipulation can be added here
}
