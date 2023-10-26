export default interface CrbcResponse<T> {
    status: number; // HTTP status code
    data: T; // Response body data
    headers: Record<string, string>; // Response headers
}