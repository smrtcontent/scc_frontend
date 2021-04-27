import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Alert from './alert'
import Definitions from './definitions'
import Portmanteaus from './portmanteaus'
import Information from './information'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 200,
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    secondaryTitle: {
        fontSize: 26,
        fontWeight: 700,
        padding: theme.spacing(1),
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 600,
        padding: theme.spacing(1),
        color: '#1e56a0',
    },
    btn: {
        margin: theme.spacing(0.5)
    },
    pos: {
        marginBottom: 12,
    },
}))

const Suggestions = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState()
    var selectedStr = ''

    // Functions for handling SnackBar
    const handleClick = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    }

    const selectAll = () => {
        console.log('here')
        if(props.portmanteaus.length > 0){
            props.portmanteaus.map(x => x.combined.split(',')
            .map(x => (selectedStr += String(x) + ' ')))
        } else {
            props.dataList.map(x => selectedStr += String(x.word) + ' ')
        }
        console.log(selectedStr)
        props.onClick(selectedStr)
        props.funChange()
        handleClick()
        setSelected('All')
    }
     
    const selectAllButton = () => {
        if(props.dataList.length > 0 || props.portmanteaus.length > 0) 
            return  (<Button
                        size='small'
                        className={classes.btn}
                        variant='contained'
                        color='primary'
                        onClick={() => selectAll()}
                        >
                        Select All
                    </Button>)

        return <></>
    }

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="info"
                >
                    You have selected <strong>{selected}</strong> <br/>
                    please use " Alt " + V to paste it in the editor

                </Alert>
            </Snackbar>
            <Card
                className={classes.root + ' suggestion-box' }
            >
                <CardContent>
                    <Typography
                        className={classes.secondaryTitle}
                        color="textPrimary"
                        gutterBottom={true}
                    >
                        Suggestions
                    </Typography>
                    <Typography
                        className={classes.subHeading}
                    >
                        {props.type}
                    </Typography>
                    {selectAllButton()}
                    <Definitions
                        meanings={props.definitions}
                    />
                    <Portmanteaus
                        portmanteaus={props.portmanteaus}
                        onClick={(e) => {
                            setSelected(e)
                            props.onClick(e)
                            props.funChange()
                            handleClick()
                        }}
                    />
                    <Information 
                        information = {props.information}
                    />
                    
                    <div
                        className='suggestions'
                        id='scroll-blue'
                    >{
                            props.dataList.map((data, index) => (
                                <Button
                                    key={index}
                                    size='small'
                                    className={classes.btn}
                                    variant='contained'
                                    color='primary'
                                    onClick={() => {
                                        props.onClick(data.word)
                                        props.funChange()
                                        setSelected(data.word)
                                        handleClick()
                                    }
                                }
                                >
                                    {data.word}
                                </Button>
                            ))
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Suggestions