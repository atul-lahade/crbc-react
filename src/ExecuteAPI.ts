import { type } from 'os';
import axios from "axios";

export async function executePOST(url: string, request: any) {

    const response = await axios
        .post<typeof request>(url, request, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                Accept: 'application/json',
            },
        });
    return response;
}

export async function executeGET(url: string) {

    const response = await axios
        .get<any>(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                Accept: 'application/json',
            },
        });
    return response;
}

export async function executeDELETE(url: string, request: any) {

    const response = await axios
        .delete<typeof request>(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                Accept: 'application/json',
            },
        });
    return response;
}