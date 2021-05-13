import {React, useState} from 'react'
import { Button } from '@material-ui/core'
import {Modal, TextField, withStyles, ListItem, Backdrop, Fade,
        makeStyles} from '@material-ui/core/';
import { indigo } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import save from './../../../features/Save/save'
import customButton from './../../../app/themes/customButton';
import SuccessSnackbar from './../../Modals/successSnackbar'

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
})(ListItem)

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
}))

  

const SaveFile = (props) => {
    const classes = useStyles()
    const customButtons = customButton()
    const [open, setOpen] = useState(false)
    const [openS, setOpenS] = useState(false)

    const handleOpen = () => {
        if (!props.saved) 
            setOpen(true)
        else {
            save(props.content, props.name, setOpenS)
            props.setSaved(true)
        }
        
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <>
            <ListItems 
                button 
                onClick={handleOpen}>
                <span
                className = {classes.itemIcon}
                >
                    <SaveIcon color='secondary'/>
                </span>
                <span 
                className={classes.itemText}
                >
                Save File
                </span>
            </ListItems>

            <div>
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
                                save(props.content, props.name, setOpenS)  
                                props.setSaved(true)
                                setOpen(false)
                            }}
                            size='small'
                        >
                            Save
                        </Button>
                    </div>
                    </Fade>
                </Modal>
            </div>
            <SuccessSnackbar 
                show = {openS}
                setShow = {setOpenS}
                message = {'The selected file has been successfully saved !'}
            />
        </>
    )
}

export default SaveFile