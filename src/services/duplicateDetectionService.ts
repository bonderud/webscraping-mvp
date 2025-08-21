export class DuplicateDetectionService {
    private existingJobs: Set<string>;

    constructor() {
        this.existingJobs = new Set<string>();
    }

    checkForDuplicates(jobId: string): boolean {
        return this.existingJobs.has(jobId);
    }

    markAsDuplicate(jobId: string): void {
        this.existingJobs.add(jobId);
    }

    clearDuplicates(): void {
        this.existingJobs.clear();
    }
}