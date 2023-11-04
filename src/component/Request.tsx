import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    IconButton,
    Avatar,
    MenuItem,
    Menu,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import DashboardBar from './DashboardBar';
import { useLocation, useNavigate } from 'react-router-dom';
import ApplicantData from '../types/interfaces/model/ApplicantData';
import RequestData from '../types/interfaces/model/RequestData';
import RequestDialog from './RequestDialog';
import RequestDialogProps from '../types/interfaces/props/RequestDialogProps';

export default function Request() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const requestList = data.requests;
    const adminProps = data.adminProps;
    const applicantProps = data.applicantProps;
    //console.log(adminProps);
    //console.log(applicantProps);
    const [requestDialogProps, setRequestDialogProps] = useState({ open: false, requestData: {} } as RequestDialogProps);

    function handleBackClick() {
        if (adminProps) {
            navigate("/admin-dashboard", { state: { adminDashboardProps: adminProps }, replace: true });

        } else {
            navigate("/applicant-dashboard", { state: { applicantDashboardProps: applicantProps }, replace: true });
        }
    }

    function viewRequest(requestId: number) {
        const result: RequestData[] = requestList.requests.filter((obj: RequestData) => {
            if (obj.requestId === requestId) {
                return obj;
            }
        });
        //console.log(result[0].requestId);
        setRequestDialogProps({ open: true, requestData: result[0] });
    }

    return (
        <div>
            <DashboardBar userName={data.userName}></DashboardBar>
            <Button onClick={handleBackClick} variant="outlined" sx={{ mb: 1, ml: 2 }}>Go back</Button>
            <Typography variant="h6" style={{ flexGrow: 1 }} align="center">
                Verification Requests
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{
                                "& th": {
                                    color: "white",
                                    backgroundColor: "info.main"
                                }
                            }}>
                                <TableCell>Request ID</TableCell>
                                <TableCell >Applicant ID</TableCell>
                                <TableCell >Comments</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >Requested Date</TableCell>
                                <TableCell >Completion Date</TableCell>
                                {adminProps && <TableCell >Action</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requestList.requests.map((row: RequestData) => (
                                <TableRow
                                    key={row.requestId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.requestId}
                                    </TableCell>
                                    <TableCell >{row.applicantId}</TableCell>
                                    <TableCell >{row.comments.toString()}</TableCell>
                                    <TableCell >{row.status}</TableCell>
                                    <TableCell >{row.requestDate.toString()}</TableCell>
                                    <TableCell >{row.completionDate ? row.completionDate.toString() : "NA"}</TableCell>
                                    {adminProps && <TableCell ><Button onClick={(e: React.MouseEvent<HTMLElement>) => viewRequest(row.requestId)} variant="outlined">View</Button></TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {requestDialogProps.open && <RequestDialog open={requestDialogProps.open} requestData={requestDialogProps.requestData} />}
        </div>
    );
}