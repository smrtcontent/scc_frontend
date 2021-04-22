import React,{ useState } from  'react'
import PageContainer from './pageContainer'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import Legends from './legends'
import Suggestions from './suggestions'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 42,
    fontWeight: 700,
    color: '#ffffff',
    margin: theme.spacing(0,2,0,2),
    padding: theme.spacing(0),
    shadow: `0 2px 1.8px -19px rgba(0, 0, 0, 0.028),
    0 4.9px 4.3px -19px rgba(0, 0, 0, 0.04),
    0 9.3px 8.1px -19px rgba(0, 0, 0, 0.05),
    0 16.5px 14.5px -19px rgba(0, 0, 0, 0.06),
    0 30.9px 27.2px -19px rgba(0, 0, 0, 0.072),
    0 74px 65px -19px rgba(0, 0, 0, 0.1);`
  },
  secondary: {
    fontSize: 16,
    padding: theme.spacing(1,1,0,1),
  },
  secondaryTitle: {
    fontSize: 26,
    padding: theme.spacing(1),
  },
  subHeading: {
    fontSize: 16,
    padding: theme.spacing(1,0),
    color: '#4756ca',
  },
  pos: {
    marginBottom: 12,
  },
}))

export default function TextEditor() {
  const classes = useStyles();

  const [dataList, setWords] = useState([]);
  const [type, setType] = useState()
  const [repText, setRepText] = useState()
  const [definitions, setDefinitions] = useState([])

  const setRep = e => setRepText(e) 

  const setChange = e => setWords(e)  

  const typeChange = e => setType(e)

  const handleDataChange = (command,newData) => {
    const URL = "http://localhost:8088/scc/api/"+command+"?word="+newData.trim()
    fetch(URL)
        .then(res => res.json())
        .then(wordList => setChange(wordList))
        .catch(err => {console.log(err)})
    
    setDefinitions([])
  }

  const handleDefinitionChange = (command, newData) => {
    setWords([])
    const URL = "http://localhost:8088/scc/api/"+command+"?word="+newData
    fetch(URL)
        .then(res => res.json())
        .then(wordList => setDefinitions(wordList))
        .catch(err => {console.log(err)})
  }

  return (
    <div className="container-fluid" >
      <Typography
        color='textSecondary'
        className={classes.secondary}
      >
        * Type the content you want to and once you feel the need, select the word and 
        press the specific key to get the type of suggestion you desire.
      </Typography>
      <div className="row" >
        <div className="col-md-8 col-12 mt-2 pl-2 pr-1">
          <Card className={classes.root}>
            <CardContent>
              <PageContainer 
                onSearch = {handleDataChange}
                onDefChange = {handleDefinitionChange}
                onChange = {typeChange}
                reptext = {repText}
              />
            </CardContent>
            {/* <Box 
              display='flex'
              justifyContent='center'
            >
              <CardActions>
                <Button 
                  variant='contained'
                  color='primary'
                  size="small"
                  >
                    Save
                </Button>
              </CardActions>
            </Box> */}
          </Card>
        </div>
        <div className="col-md-4 col-12 mt-2 pl-2 pr-1">
          <Suggestions
            type = {type}
            dataList = {dataList}
            definitions = {definitions}
            onClick = {setRep}
            />
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-md-12 pl-2 pr-1'>
          <Legends />
        </div>
      </div>
    </div>
  )
}
