import {React, useState} from 'react'
import { Button } from '@material-ui/core'
import {Modal, TextField, withStyles, ListItem, Backdrop, Fade,
        Snackbar, makeStyles} from '@material-ui/core/'
import MuiAlert from '@material-ui/lab/Alert'
import { indigo } from '@material-ui/core/colors'
import PostAddIcon from '@material-ui/icons/PostAdd'
import customButton from './../../../app/themes/customButton'
import OpenFiles from '../../Modals/openFiles'

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

const OpenFile = (props) => {
    const classes = useStyles()
    const customButtons = customButton()
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [openS, setOpenS] = useState(false)
    const [success, setSuccess] = useState()
    const [fileModal, setFileModal] = useState(<></>)
    const [openModalInner, setOpenModalInner] = useState(false)

    const handleOpen = () => {
        setOpenS(true)
        setOpen(true)
    }

    const fileOpenModal = (e=<></>) => setFileModal(e)

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenS(false)
        setSuccess(false)
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
                        <form className={classes.root} autoComplete="off">
                            <TextField 
                                id="standard-basic" 
                                label="" 
                                value = { name }
                                onChange = { e => setName(e.target.value) }    
                            />
                        </form>
                        <Button
                            variant='contained'
                            color='secondary'
                            className={customButtons.root}
                            onClick = { () => {
                                if(name === ''){
                                    alert('Please Enter the file name!')
                                    return 
                                }
                                // props.setSaved(true)
                                fileOpenModal(<OpenFiles 
                                    open = {openModalInner}
                                    setOpen = {setOpenModalInner}
                                    setName = {props.setName}
                                    openFileContent = {props.openFileContent}
                                    setOpenFileContent = {props.setOpenFileContent}
                                />)
                                setOpen(false)
                            }}
                            size='small'
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
                    <PostAddIcon color='secondary'/>
                </span>
                <span 
                className={classes.itemText}
                >
                Open File
                </span>
            </ListItems>
            <div>
                {modal()}
            </div>
            <div>
                { fileModal }
            </div>
            <div>
                { snackbar() }
            </div>
        </>
    )
}

export default OpenFile