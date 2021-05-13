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

export const DualRhymes = (props) => {
  const classes = useStyles();
  const [word1, setWord1] = useState()
  const [word2, setWord2] = useState()

  const handleClose = () => props.setOpen(false)
  const handleChangeW1 = e => setWord1(e.target.value)
  const handleChangeW2 = e => setWord2(e.target.value);

  const handleSearch = () =>{
    const data = {word1} + ' ' + {word2}
    props.handleCommand('findDualRhymes', data, 'Dual Rhymes')
    setWord1('')
    setWord2('')
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
            <h2 id="transition-modal-title">Dual Rhyme Search</h2>
            <form 
                id="transition-modal-description"
                className={classes.root} 
                noValidate 
                autoComplete="off">
                <TextField 
                    id="standard-basic" 
                    label="Starting Letter" 
                    value = {Word1}
                    onChange = {handleChangeW1}
                />
                <br/>
                <TextField 
                    id="standard-basic"
                    label="Word"
                    value = {Word2}
                    onChange = {handleChangeW2}
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