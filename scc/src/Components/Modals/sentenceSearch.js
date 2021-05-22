import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, TextField, Box, Button, Snackbar } from '@material-ui/core'
import customButton from './../../app/themes/customButton'
import WarningAlert from './../Alerts/warningAlert'

const SentenceSearch = () =>{

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [syllable, setSyllable] = useState()
  
    const handleClose = () => props.setOpen(false)
    const handleChangeSyllable = e => setSyllable(e.target.value)
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') return
      setOpen(false)
    }
  
    const handleSearch = e =>{
      e.preventDefault()
      console.log('here')
      if(syllable === undefined) {
        setOpen(true)
        return
      }
      console.log('here')
      setSyllable(undefined)
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
              <h4 id="transition-modal-title">Sentence Search</h4>
              <form 
                  id="transition-modal-description"
                  className={classes.root} 
                  onSubmit={ handleSearch }
                  noValidate 
                  autoComplete="off">
                  <TextField 
                      id="standard-basic" 
                      label="First Word" 
                      value = {syllable}
                      onChange = {handleChangeSyllable}
                      autoFocus
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

export default SentenceSearch