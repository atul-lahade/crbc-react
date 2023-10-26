import axios from "axios";
import ActivityLog from "./types/interfaces/model/ActivityLog";

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

export async function executeGET(url: string, request: any) {

    const response = await axios
        .get<ActivityLog[]>(url, {
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