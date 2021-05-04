import {React, useState} from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Modal, TextField} from '@material-ui/core/';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import save from './../../features/Save/save'
import customButton from '../../app/themes/customButton';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
  

const Save = (props) => {
    const classes = useStyles()
    const customButtons = customButton()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button 
                variant='contained'
                color='secondary'
                className={customButtons.root}
                onClick = {
                    // save(props.content)
                    handleOpen
                }
                size='small'
            >
                Save
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h4 id="transition-modal-title">File Name</h4>
                    {/* <p id="transition-modal-description"> */}
                    <form className={classes.root} autoComplete="off">
                        <TextField 
                            id="standard-basic" 
                            label="" 
                            value = { name }
                            onChange = { e => setName(e.target.value) }    
                        />
                    </form>
                    {/* </p> */}
                    <Button
                        variant='contained'
                        color='secondary'
                        className={customButtons.root}
                        onClick = { () => {
                            save(props.content, name) 
                            setOpen(false)
                        }}
                        size='small'
                        validate
                    >
                        Submit
                    </Button>
                </div>
                </Fade>
            </Modal>
        </>
    )
}

export default Save