
export interface CrbcResponse<T> {
    status: number;
    message: string;
    data?: T;
}