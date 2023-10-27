import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertDialogProps from '../types/interfaces/props/AlterDialogProps';

export default function AlertDialog(props: AlertDialogProps) {
  
    return (
        <div>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.heading}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button href="/sign-in" autoFocus variant="outlined">
                        {props.buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
