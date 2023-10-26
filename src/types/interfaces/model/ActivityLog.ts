export default interface ActivityLog {
    logId: number;
    user: User;
    activityType: string;
    activityDetails: string;
    activityTimestamp: Date;
}

export interface User {
    userId: number;
    username: string;
    email: string;
    userType: string;
}