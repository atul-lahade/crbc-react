export default interface RequestData {
    requestId: number;
    applicantId: number;
    requestDate: Date;
    status: string;
    assignedTo: number;
    comments: string;
    completionDate: Date;
    lastUpdated: Date;
}