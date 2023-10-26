export default interface CrbcRequest {
    method: string; // HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
    url: string; // API endpoint URL
    headers?: Record<string, string>; // HTTP headers
    data?: string; // Request body data
}