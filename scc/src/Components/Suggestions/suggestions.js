import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, Snackbar } from '@material-ui/core'
import { makeStyles, CircularProgress } from '@material-ui/core'
import Alert from './../Alerts/alert'
import Definitions from './../Suggestions/definitions'
import Portmanteaus from './../Suggestions/portmanteaus'
import Information from './../Suggestions/information'
import customCard from './../../app/themes/customCard'

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
        padding: theme.spacing(1,1,0,1),
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 600,
        padding: theme.spacing(0,1,1,1),
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
    const customCards = customCard()
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
            return  (
                    <Button
                        size='small'
                        className={classes.btn}
                        color='primary'
                        onClick={() => selectAll()}
                        style={{fontSize: '0.75rem'}}
                        >
                        Select All
                    </Button>
                    )

        return <></>
    }

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="info"
                >
                    You have selected <strong>{selected}</strong>
                    please use " Alt " + V to paste it in the editor

                </Alert>
            </Snackbar>
            <Card
                className={classes.root + ' ' + customCards.suggestions}
            >
                <CardContent>
                    <Typography
                        className={classes.secondaryTitle + 
                            ' d-flex justify-content-between pe-3'}
                        gutterBottom
                    >
                        Suggestions
                        {selectAllButton()}
                    </Typography>
                    <Typography
                        className={classes.subHeading}
                    >
                        {props.type}
                    </Typography>
                    {props.isLoading?
                    <div className='d-flex justify-content-center'>
                        <CircularProgress 
                        color='secondary'
                        style={{ marginTop: '16vh'}}
                     />
                    </div>
                     :<></>}
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
                                variant='outlined'
                                color='secondary'
                                style={{fontSize: '0.65rem', borderRadius:'2px'}}
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