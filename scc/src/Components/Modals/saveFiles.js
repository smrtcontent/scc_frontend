import {React, useState} from 'react'
import { Button } from '@material-ui/core'
import {Modal, TextField, Backdrop, Fade,
        Snackbar, makeStyles} from '@material-ui/core/';
import Alert from './../Alerts/alert'
import save from './../../features/Save/save'
import customButton from './../../app/themes/customButton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    itemIcon: {
        margin: theme.spacing(0,2,0,0),
        color: 'secondary',
        fontWeight: 100,
        height: '18px',
        width: 'auto',
    },

    itemText: {
        color: '#141414',
        fontSize: '0.80rem',
        paddingTop: '8px',
    }
}));

  

const SaveFiles = (props) => {
    const classes = useStyles()
    const customButtons = customButton()
    const [openS, setOpenS] = useState(false)
    const [success, setSuccess] = useState()
    const [saved, setSaved] = useState(false)

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenS(false)
        setSuccess(false);
    }

    const snackbar = () => {
        if(success){
            return (
                <Snackbar open={openS} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity="success">
                        File has been saved successfully !
                    </Alert>
                </Snackbar>
            )
        }
    }
    
    const modal = () => {
            // alert('here')
            return(
                <Modal
                    aria-labelledby="transition-modal-title"
                    className={classes.modal}
                    open={props.open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={props.open}>
                    <div className={classes.paper}>
                        <h4 id="transition-modal-title">File Name</h4>
                        <form className={classes.root} autoComplete="off">
                            <TextField 
                                id="standard-basic" 
                                label="" 
                                value = { props.name }
                                onChange = { e => props.setName(e.target.value) }    
                            />
                        </form>
                        <Button
                            variant='contained'
                            color='secondary'
                            className={customButtons.root}
                            onClick = { () => {
                                if(props.name === ''){
                                    alert('Please Enter a file name!')
                                    return 
                                }
                                save(props.content, props.name, setSuccess) 
                                setSaved(true)
                                props.setOpen(false)
                            }}
                            size='small'
                            validate
                        >
                            Submit
                        </Button>
                    </div>
                    </Fade>
                </Modal>
            )
    }

    return (
        <>
            <div>
                { !saved ? modal() : save(props.content, props.name, setSuccess) }
                { snackbar() }
            </div>
        </>
    )
}

export default SaveFiles