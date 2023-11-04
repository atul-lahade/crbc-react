import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import RequestDialogProps from "../types/interfaces/props/RequestDialogProps";
import { RequestStatus } from "../types/enum/RequestStatus";
import axios from "axios";
import { executePOST } from "../ExecuteAPI";
import RequestData from "../types/interfaces/model/RequestData";
import CrbUpdateRequest from "../types/interfaces/model/CrbUpdateRequest";

export default function RequestDialog(props: RequestDialogProps) {
    const theme = useTheme();
    const [status, setStatus] = React.useState(props.requestData.status);
    const [comment, setComment] = React.useState(props.requestData.comments);
    const [open, setOpen] = React.useState(props.open);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const updateRequest = () => {
        try {
            let updateRequest: CrbUpdateRequest = {
                requestId: props.requestData.requestId,
                comment: comment,
                status: status
            };
            console.log(updateRequest);
            executePOST("http://localhost:8080/api-crbc/update-request", updateRequest).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setOpen(false);
                }
            });;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                // 👇️ error: AxiosError<any, any>
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    };
    const closeDialog = () => {
        setOpen(false);
    };
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(event.target.value as string);
    };
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    return (<React.Fragment>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={updateRequest}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title" align="center">
                {"Criminal Record Check Request"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <span><strong>Request ID    : </strong>{props.requestData.requestId}</span><br /><br />
                    <span><strong>Applicant ID  : </strong>{props.requestData.applicantId}</span><br /><br />
                    <span><strong>Comment   : </strong><TextField id="outlined-basic" label="Comment" variant="outlined" defaultValue={props.requestData.comments} onChange={handleCommentChange} /></span><br /><br />
                    <span><strong>Requested Date    : </strong>{props.requestData.requestDate.toString()}</span><br /><br />
                    <span><strong>Status    : </strong>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={status}
                            label="Status"
                            onChange={handleChange}
                        >
                            {Object.values(RequestStatus).map(key => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </span><br />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} autoFocus variant="outlined">
                    Close
                </Button>
                <Button onClick={updateRequest} autoFocus variant="outlined">
                    UPDATE
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}