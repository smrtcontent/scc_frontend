import React, {useState} from 'react'
import { Card, CardContent, Divider, List, ListItem, Typography } from '@material-ui/core'
import {Modal, withStyles, Backdrop, Fade,
        makeStyles} from '@material-ui/core/'
import DescriptionIcon from '@material-ui/icons/Description'
import { indigo } from '@material-ui/core/colors'
import SuccessSnackbar from './successSnackbar'
import Open from './../../features/Open/open'

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
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(2px)',
        border: '2px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: '90%',
        width: '90%',
        borderRadius: '3px',

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

const OpenFiles = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        props.setOpen(false)
    }

    return (
        <>
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
                    <Card className={classes.paper}>
                        <CardContent>
                            <Typography 
                                id="transition-modal-title"
                                variant='h5'
                                >
                                Please select the file of your choice
                            </Typography>
                            <List>
                                {
                                    props.files.map((x,index) => (
                                        <>
                                            <ListItems
                                                button
                                                className = {classes.itemText}
                                                style={{color:'black'}}
                                                key = {index}
                                                onClick = { () =>{
                                                    Open(x.fileName,props.setOpenFileContent, props.setName)
                                                    props.setOpen(false)
                                                    setOpen(true)
                                                } }
                                            >
                                                <DescriptionIcon 
                                                    className={classes.itemIcon}
                                                    color = 'primary'
                                                />
                                                {x.fileName}
                                            </ListItems>
                                            <Divider 
                                                flexItem
                                                variant='fullWidth'
                                                style={{backgroundColor:'black'}}
                                            />
                                        </>
                                    ))
                                }
                            </List>
                            
                        </CardContent>
                    </Card>
                </Fade>
            </Modal>
            <SuccessSnackbar 
                show = {open}
                setShow = {setOpen}
                message = {'The selected file has been successfully loaded !'}
            />
        </>
        
    )
}

export default OpenFiles