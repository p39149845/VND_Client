import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'


function Notification(props) {
    const {notify,setnotify} =props;

    const handleClose = (event, reason) => {
        if(reason === "clickaway") {
            return;
        }
        setnotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'top', horizontal: "right" }}
            onClose={handleClose}
        >
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
