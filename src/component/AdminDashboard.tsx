import { useEffect, useState } from "react";
import AdminDashboardProps from "../types/interfaces/props/AdminDashboardProps";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Typography,
    Container,
    Grid,
    Paper,
    IconButton,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import DashboardBar from "./DashboardBar";
import { HttpStatusCode } from "../types/enum/HttpStatusCode";
import axios from "axios";
import { CrbcResponse } from "../types/interfaces/CrbcResponse";
import ApplicantData from "../types/interfaces/model/ApplicantData";
import RequestData from "../types/interfaces/model/RequestData";

export default function AdminDashboard() {
    const location = useLocation();
    const navigation = useNavigate();
    const [adminProps, setAdminProps] = useState({} as AdminDashboardProps);

    useEffect(() => {
        setAdminProps(location.state.adminDashboardProps);
    });
    const goToNewRequests = () => {
        const req = {
            method: 'GET',
            url: 'http://localhost:8080/api-crbc/get-new-request/' + adminProps.administratorId,
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
        };
        axios
            .request(req)
            .then(function ({ data }: { data: CrbcResponse<RequestData[]> }) {
                if (data.status === HttpStatusCode.OK) {
                    let requestList: RequestData[] = data.data!;
                    console.log(requestList);
                    navigation("/admin-new-requests", { state: { userName: adminProps.userName, requests: requestList, adminProps: adminProps }, replace: true });
                }
            })
            .catch(function (error: any) {
                console.error(error);
            });
    };

    const goToAllRequests = () => {
        const req = {
            method: 'GET',
            url: 'http://localhost:8080/api-crbc/get-all-request/' + adminProps.administratorId,
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
        };
        //console.log(req);
        axios
            .request(req)
            .then(function ({ data }: { data: CrbcResponse<RequestData[]> }) {
                if (data.status === HttpStatusCode.OK) {
                    let requestList: RequestData[] = data.data!;
                    navigation("/admin-all-requests", { state: { userName: adminProps.userName, requests: requestList, adminProps: adminProps }, replace: true });
                }
            })
            .catch(function (error: any) {
                console.error(error);
            });
    };

    const goToAllApplicants = async () => {

        const req = {
            method: 'GET',
            url: 'http://localhost:8080/api-crbc/get-all-applicants',
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
        };
        axios
            .request(req)
            .then(function ({ data }: { data: CrbcResponse<ApplicantData[]> }) {
                if (data.status === HttpStatusCode.OK) {
                    let appl: ApplicantData[] = data.data!;
                    navigation("/admin-all-applicants", { state: { userName: adminProps.userName, applicants: appl, adminProps: adminProps }, replace: true });
                }
            })
            .catch(function (error: any) {
                console.error(error);
            });
    };

    return (
        <div>
            <DashboardBar userName={adminProps.userName}></DashboardBar>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} sx={{ mt: 4 }}>
                        <Paper style={{ padding: 16 }}>
                            <Typography variant="h6">New Requests
                                <IconButton color="inherit" onClick={goToNewRequests}>
                                    <ArrowCircleRightOutlinedIcon />
                                </IconButton>
                            </Typography>

                            <p>All the new requests, with details such as the crime description, conviction date, severity level, and judicial authority, are included to give administrators a clear understanding of the request.</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ mt: 4 }}>
                        <Paper style={{ padding: 16 }}>
                            <Typography variant="h6">All Requests
                                <IconButton color="inherit" onClick={goToAllRequests}>
                                    <ArrowCircleRightOutlinedIcon />
                                </IconButton></Typography>
                            <p>All the requests, with details of applicant and status of the request.</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ mt: 4 }}>
                        <Paper style={{ padding: 16 }}>
                            <Typography variant="h6">All Applicants
                                <IconButton color="inherit" onClick={goToAllApplicants}>
                                    <ArrowCircleRightOutlinedIcon />
                                </IconButton></Typography>
                            <p>All the appllicant who registered on CRBC platform.</p>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}
