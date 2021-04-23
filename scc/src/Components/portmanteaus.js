import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    btn: {
        margin: theme.spacing(0.5)
    },
  }))

const Portmanteaus = (props) => {
    const classes = useStyles()
    const portmanteaus = []
    
    const source = () => {
        props.portmanteaus.map((x,index) => {
            portmanteaus.push(
                <div className='row'>
                    <strong key ={index} className=' col-10'>
                    {x.source.split(',')[0]} + {x.source.split(',')[1]}
                </strong></div>)
            if(x.combined.split(',')[1]) {
            portmanteaus.push(<div className='row'>
                    <Button 
                        key={index}
                        size='small'
                        className={classes.btn}
                        variant='contained'
                        color='primary'
                        onClick={() => props.onClick(x.combined.split(',')[0])}
                    > {x.combined.split(',')[0]} </Button>
                    <Button 
                        key={index + 100000}
                        size='small'
                        className={classes.btn}
                        variant='contained'
                        color='primary'
                        onClick={() => props.onClick(x.combined.split(',')[1])}
                    > {x.combined.split(',')[1]} </Button>
                </div>)
            } else {
                portmanteaus.push(<div className='row'>
                    <Button 
                        key={index}
                        size='small'
                        className={classes.btn + ' offset-md-2 col-5 '}
                        variant='contained'
                        color='primary'
                        onClick={() => props.onClick(x.combined.split(',')[0])}
                    > {x.combined.split(',')[0]} </Button>
                </div>)
            }
            return 1
        })
    }

    source()

    // This is the return module for the portmanteaus component 
    if(props.portmanteaus.length > 0) // This will check if the props contain portmanteaus or not
    {
        // This section will be returned only if the props contain portmanteaus
        return (
            <div 
                id="scroll-blue"
                className='suggestions pl-2'
                >
                {
                    portmanteaus.map((x,index) => <div 
                    key = {index}
                    className='container-fluid' >{x}</div>)
                }
            </div>
        )
    } else {
        return (
            //This empty react fragment will be returned if the portmanteaus are not there
            <>
            </>
        )
    }
}

export default Portmanteaus