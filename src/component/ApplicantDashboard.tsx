import { useEffect, useState } from "react";
import ApplicantDashboardProps from "../types/interfaces/props/ApplicantDashboardProp";
import DashboardBar from "./DashboardBar";
import { HttpStatusCode } from "../types/enum/HttpStatusCode";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, Paper, Typography, IconButton } from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import axios from "axios";
import { CrbcResponse } from "../types/interfaces/CrbcResponse";
import RequestData from "../types/interfaces/model/RequestData";

export default function ApplicantDashboard() {
    const location = useLocation();
    const navigation = useNavigate();
    const [applicantProps, setApplicantProps] = useState({} as ApplicantDashboardProps);

    useEffect(() => {
        setApplicantProps(location.state.applicantDashboardProps);
    });

    const goToCreateNewRequest = () => {

    };

    const goToAllRequests = () => {
        const req = {
            method: 'GET',
            url: 'http://localhost:8080/api-crbc/get-all-applicant-request/' + applicantProps.applicantId,
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
                    navigation("/applicant-all-requests", { state: { userName: applicantProps.userName, requests: requestList, applicantProps: applicantProps }, replace: true });
                }
            })
            .catch(function (error: any) {
                console.error(error);
            });
    };
    return (
        <div>
            <DashboardBar userName={applicantProps.userName}></DashboardBar>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} sx={{ mt: 4 }}>
                        <Paper style={{ padding: 16 }}>
                            <Typography variant="h6">Create New Request
                                <IconButton color="inherit" onClick={goToCreateNewRequest}>
                                    <ArrowCircleRightOutlinedIcon />
                                </IconButton>
                            </Typography>
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
                </Grid>
            </Container>
        </div>
    );
}