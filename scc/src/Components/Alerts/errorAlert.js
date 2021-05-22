import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect:'none',
    width: 'inherit',
    '& > * + *': {
      marginTop: theme.spacing(0),
    },
  },
  alertContent: {
    backgroundColor: 'rgba(255,0,0,0.14)',
    backdropFilter: 'blur(1px)',
    alignContent: 'center',
    margin: '0',
    padding: '0 0 0 0.5rem',
    '& > * + *': {
      margin: theme.spacing(0),
    },
  },
}))

const ErrorAlert = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert 
        variant="outlined" 
        severity="error"
        className={classes.alertContent}
        >
        {props.message}
      </Alert>
    </div>
  )
}

export default ErrorAlert