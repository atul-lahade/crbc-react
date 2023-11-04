import { useLocation, useNavigate } from "react-router-dom";
import DashboardBar from "./DashboardBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ApplicantData from "../types/interfaces/model/ApplicantData";
import { Button, TablePagination, Typography } from "@mui/material";
import { useState } from "react";

export default function Applicants() {

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const state = data.applicants;
    const adminProps = data.adminProps;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    function handleClick() {
        navigate("/admin-dashboard", { state: { adminDashboardProps: adminProps }, replace: true });
    }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <DashboardBar userName={data.userName}></DashboardBar>
            <Button onClick={handleClick} variant="outlined">Go back</Button>
            <Typography variant="h6" style={{ flexGrow: 1 }} align="center">
                Applicants Data
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
                                <TableCell>Applicant ID</TableCell>
                                <TableCell >Full Name</TableCell>
                                <TableCell >DOB</TableCell>
                                <TableCell >Gender</TableCell>
                                <TableCell >Nationality</TableCell>
                                <TableCell >Crime Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.applicants.map((row: ApplicantData) => (

                                <TableRow
                                    key={row.applicantId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.applicantId}
                                    </TableCell>
                                    <TableCell >{row.fullName}</TableCell>
                                    <TableCell >{row.dateOfBirth.toString()}</TableCell>
                                    <TableCell >{row.gender}</TableCell>
                                    <TableCell >{row.nationality}</TableCell>
                                    <TableCell >{row.criminalRecord ? row.criminalRecord.crimeDescription : "NA"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={state.applicants.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}