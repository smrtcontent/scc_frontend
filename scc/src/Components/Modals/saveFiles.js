import {React, useState} from 'react'
import { Button } from '@material-ui/core'
import {Modal, TextField, Backdrop, Fade, makeStyles} from '@material-ui/core/';
import save from './../../features/Save/save'
import customButton from './../../app/themes/customButton'
import SuccessSnackbar from './successSnackbar'

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
        border: '0px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))


const SaveFiles = (props) => {
    const classes = useStyles()
    const customButtons = customButton()
    const [openS, setOpenS] = useState(false)

    const handleClose = () => {
        props.setOpen(false);
    }

    return (
        <>
            <div>
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
                                save(props.content, props.name, setOpenS)
                                props.setSaved(true)
                                props.setOpen(false)
                            }}
                            size='small'
                            validate
                        >
                            Save
                        </Button>
                    </div>
                    </Fade>        
                </Modal>
            </div>
            <div>
                <SuccessSnackbar 
                    show = {openS}
                    setShow = {setOpenS}
                    message = {'The selected file has been successfully saved !'}
                />
            </div>
        </>
    )
}

export default SaveFiles