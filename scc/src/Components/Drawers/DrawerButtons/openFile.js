import React, {useState} from 'react'
import {withStyles, ListItem, makeStyles} from '@material-ui/core/';
import PostAddIcon from '@material-ui/icons/PostAdd'
import { indigo } from '@material-ui/core/colors';

import OpenFiles from './../../Modals/openFiles'

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
    const [open, setOpen] = useState(false) 
    const [files, setFiles] = useState([])

    const fetchFiles = () => {
        const URL = 'http://localhost:8088/scc/api/getFileByUserId?userId=34'
        fetch(URL)
        .then(res=>res.json())
        .then(result => {
            setFiles(result)
        })
        .catch(err=>console.log(err))
    }

    const handleOpen = () => {
        fetchFiles()
        setOpen(true)
    }

    return (
        <div>
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

            <OpenFiles 
                open = {open}
                setOpen = {setOpen}
                files = {files}
                setOpenFileContent = {props.setOpenFileContent}
                setName = {props.setName}
            />
        </div>
        
    )

}

export default OpenFile