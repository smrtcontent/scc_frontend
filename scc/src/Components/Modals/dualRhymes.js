import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, TextField, Box, Button, Snackbar } from '@material-ui/core'
import customButton from './../../app/themes/customButton'
import WarningAlert from './../Alerts/warningAlert'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #fff',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '3px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 3,

    },
}));

const DualRhymes = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [word1, setWord1] = useState()
  const [word2, setWord2] = useState()

  const handleClose = () => props.setOpen(false)
  const handleChangeW1 = e => setWord1(e.target.value)
  const handleChangeW2 = e => setWord2(e.target.value)
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false);
  }

  const handleSearch = e =>{
    e.preventDefault()
    console.log('here')
    if(word1 === undefined || word2 === undefined) {
      console.log('error logged')
      setOpen(true)
      return
    }
    console.log('here')
    const data = word1.trim() + ' ' + word2.trim()
    console.log(`${word1} ${word2} ${data}`)
    props.handleCommand('findDualRhymes', data, 'Dual Rhymes')
    setWord1(undefined)
    setWord2(undefined)
    handleClose()
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <WarningAlert
          open={open}
          onClose={handleCloseSnackbar}
          message='Please Enter both the Words!'
        />
      </Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <h4 id="transition-modal-title">Dual Rhymes Search</h4>
            <form 
                id="transition-modal-description"
                className={classes.root} 
                onSubmit={ handleSearch }
                noValidate 
                autoComplete="off">
                <TextField 
                    id="standard-basic" 
                    label="First Word" 
                    value = {word1}
                    onChange = {handleChangeW1}
                    autoFocus
                />
                <br/>
                <TextField 
                    id="standard-basic"
                    label="Second Word"
                    value = {word2}
                    onChange = {handleChangeW2}
                    />
            <Box 
                justifyContent='center'
                >
                <Button
                    type = 'submit'
                    variant = 'contained'
                    color = 'primary'
                    className = {customButton().root}
                >
                    Search
                </Button>
            </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default DualRhymes