export interface Job {
    id: number;
    title: string;
    company: string;
    datePosted: Date;
    description?: string;
    location?: string;
    url: string;
}

export class JobModel {
    constructor(public job: Job) {}

    // Additional methods for job manipulation can be added here
}