import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, TextField, Box, Button } from '@material-ui/core'
import customButton from './../../app/themes/customButton'
import ErrorAlert from './../Alerts/errorAlert' 

const useStyles = makeStyles((theme) => ({
    root: {

        '& > *': {
            margin: theme.spacing(1),
            width: '90%',
        },
    },
    modal: {
        userSelect:'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 3,

    },
}))

const SimilarWordEnd = (props) => {
  const classes = useStyles()
  const [Letter, setLetter] = useState()
  const [Word, setWord] = useState()
  const [ErrMsg, setErrMsg] = useState('')
  const [Disable, setDisable]= useState(true)


  const handleClose = () => props.setOpen(false)
  const handleChangeL = e => setLetter(e.target.value)
  const handleChangeW = e => setWord(e.target.value)

  useEffect(() => Validation())

  const Validation = () => {
    if(Letter === undefined){
      return true
    } 
    else if(Letter===''){
      setErrMsg('Please Enter a letter')
      setDisable(true)
      return true
    }
    else if(!/^[a-zA-Z]\s*$/.test(Letter)){
      setErrMsg('Please Enter a valid English Alphabet')
      setDisable(true)
      return true
    } 
    else if(Word === undefined){
      setErrMsg('')
      return true
    } 
    else if(Word===''){
      setErrMsg('Please Enter a Word')
      setDisable(true)
      return true
    }
    else if(!/^[a-zA-Z]+\s*$/.test(Word)){
      setErrMsg('Please enter a valid English Word')
      setDisable(true)
      return true
    } 
    else {
      setErrMsg('')
    }
    setDisable(false)
  }

  const handleSearch = e =>{
    e.preventDefault()
    const data = [Letter.trim(), Word.trim()]
    props.handleCommand('findSimilarEndsWith', data, 'Words with similar ending')
    setLetter(undefined)
    setWord(undefined)
    handleClose()
  }

  return (
    <div>
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
            <h2 id="transition-modal-title">Similar word search </h2>
            {ErrMsg.length>1?<ErrorAlert message={ErrMsg}/>:<></>}
            <form 
                id="transition-modal-description"
                className={classes.root} 
                onSubmit={handleSearch}
                noValidate 
                autoComplete="off">
                <TextField 
                    id="standard-basic" 
                    label="End Letter" 
                    value = {Letter}
                    onChange = {handleChangeL}
                    autoFocus
                    required
                />
                <br/>
                <TextField 
                    id="standard-basic"
                    label="Word"
                    value = {Word}
                    onChange = {handleChangeW}
                    required
                    />
                <Box 
                    justifyContent='center'
                    >
                    {Disable?
                      <Button
                        type='submit'
                        variant = 'contained'
                        color = 'primary'
                        className={customButton().root}
                        disabled
                      >
                        Search
                      </Button> :
                      <Button
                        type='submit'
                        variant = 'contained'
                        color = 'primary'
                        className={customButton().root}
                      >
                        Search
                      </Button>
                    }
                </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default SimilarWordEnd