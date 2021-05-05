import {React, useState} from 'react'
import { Button } from '@material-ui/core'
import {Modal, TextField, withStyles, ListItem, Backdrop, Fade,
        Snackbar, makeStyles} from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import { indigo } from '@material-ui/core/colors';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import save from './../../../features/Save/save'
import customButton from './../../../app/themes/customButton';
import SaveFiles from './../DrawerButtons/saveFile'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ListItems = withStyles({
    root: {
      "&$selected": {
        backgroundColor: indigo[500],
        color: "white"
      },
      "&:hover": {
        backgroundColor: indigo[100],
        backdropFilter: 'blur(1px)',
      }
    },
    selected: {}
})(ListItem);

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

  

const SaveFile = (props) => {
    const classes = useStyles()
    const customButtons = customButton()
    const [open, setOpen] = useState(false)
    const [openS, setOpenS] = useState(false)
    const [success, setSuccess] = useState()
    const [saved, setSaved] = useState(false)

    const handleOpen = () => {
        setOpenS(true)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            return(
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
            )
    }

    return (
        <>
            <ListItems 
                button 
                onClick={handleOpen}>
                <span
                className = {classes.itemIcon}
                >
                    <SaveAltIcon color='secondary'/>
                </span>
                <span 
                className={classes.itemText}
                >
                Save File
                </span>
            </ListItems>

            <div>
                { !saved ? modal() : save(props.content, props.name, setSuccess) }
                { snackbar() }
            </div>

            {/* <SaveFiles name={name} setName={setName} /> */}
        </>
    )
}

export default SaveFile