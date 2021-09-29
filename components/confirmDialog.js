import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(10),
        borderRadius: theme.spacing(2),
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: "center"
    },
    dialogActions: {
        justifyContent: "center"
    },
    titleIcon: {
        backgroundColor: theme.palette.inherit,
        color: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '10rem',
        }
    }
}));

function ConfirmDialog(props) {
    const { confirmDialog, setconfirmDialog } = props

    const Classes = useStyles()
    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: Classes.dialog }}>
            <DialogTitle className={Classes.dialogTitle}>
                <IconButton disableRipple className={Classes.titleIcon}>
                    <DirectionsBusIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={Classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={Classes.dialogActions}>
                <button
                    className="btn btn-success"
                    onClick={
                        confirmDialog.onConfirm
                    }>
                    YES
                </button>
                <button
                    className="btn btn-danger"
                    onClick={
                        () =>
                            setconfirmDialog({ ...confirmDialog, isOpen: false })
                    }>
                    NO
                </button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
