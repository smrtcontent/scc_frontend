import React from 'react'
import { Snackbar } from '@material-ui/core/';
import Alert from './../Alerts/alert'

const SuccessSnackbar = (props) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setShow(false)
    }

    return (
        <>
            <Snackbar open={props.show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    File has been saved successfully !
                </Alert>
            </Snackbar>
        </>
    )
}
export default SuccessSnackbar