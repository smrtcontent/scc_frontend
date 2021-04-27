import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, TextField, Box, Button } from '@material-ui/core';

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

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 3,

    },
}));

const SimilarWordEnd = (props) => {
  const classes = useStyles();
  const [Letter, setLetter] = useState()
  const [Word, setWord] = useState()

  const handleClose = () => props.setOpen(false)
  const handleChangeL = e => setLetter(e.target.value)
  const handleChangeW = e => setWord(e.target.value)

  const handleSearch = () =>{
    const data = [Letter, Word]
    props.handleCommand('findSimilarEndsWith', data, 'Words with similar ending')
    setLetter('')
    setWord('')
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
            <form 
                id="transition-modal-description"
                className={classes.root} 
                noValidate 
                autoComplete="off">
                <TextField 
                    id="standard-basic" 
                    label="End Letter" 
                    value = {Letter}
                    onChange = {handleChangeL}
                />
                <br/>
                <TextField 
                    id="standard-basic"
                    label="Word"
                    value = {Word}
                    onChange = {handleChangeW}
                    />
            </form>
            <Box 
                justifyContent='center'
                >
                <Button
                    variant = 'contained'
                    color = 'primary'
                    onClick = {() => {
                        handleSearch()
                        handleClose()
                    }
                    }
                >
                    Search
                </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default SimilarWordEnd