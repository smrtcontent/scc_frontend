import { Card, CardContent, List, ListItem } from '@material-ui/core'
import React,{useState} from 'react'
import { Button } from '@material-ui/core'
import {Modal, withStyles, Backdrop, Fade,
        makeStyles} from '@material-ui/core/'
import { indigo } from '@material-ui/core/colors'
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

const OpenFiles = (props) => {
    const classes = useStyles()
    const [files, setFiles] = useState([])

    const URL = 'http://localhost:8088/scc/api/getFileByUserId?userId=34'
    fetch(URL)
    .then(res=>res.json())
    .then(result => {
        setFiles(result)
        alert('here')
    })
    .catch(err=>console.log(err))

    const handleClose = () => {
        props.setOpen(false)
    }

    return (
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
                    <p id="transition-modal-title">
                        Please select the file of your choice
                    </p>
                    <List>
                        <ListItems>
                            {
                                files.map(x => {
                                    return (
                                    <Button
                                        style={{width:'100%'}}
                                        onClick = {
                                            Open(x.filename,props.seOpenFileContent, props.setName)
                                        } 
                                    >
                                        x.fileName
                                    </Button>
                                    )
                                })
                            }
                        </ListItems>
                    </List>
                    
                </CardContent>
            </Card>
            </Fade>
        </Modal>
        
    )
}

export default OpenFiles