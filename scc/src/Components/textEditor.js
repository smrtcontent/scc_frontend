import React, { useState } from 'react'
import PageContainer from './pageContainer'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography} from '@material-ui/core';
import { isMobile } from "react-device-detect";
import ActionButtons from './actionButtons'
import Legends from './legends'
import Suggestions from './suggestions'
import Save from './Modals/saveButton';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 42,
    fontWeight: 700,
    color: '#ffffff',
    margin: theme.spacing(0, 2, 0, 2),
    padding: theme.spacing(0),
    shadow: `0 2px 1.8px -19px rgba(0, 0, 0, 0.028),
    0 4.9px 4.3px -19px rgba(0, 0, 0, 0.04),
    0 9.3px 8.1px -19px rgba(0, 0, 0, 0.05),
    0 16.5px 14.5px -19px rgba(0, 0, 0, 0.06),
    0 30.9px 27.2px -19px rgba(0, 0, 0, 0.072),
    0 74px 65px -19px rgba(0, 0, 0, 0.1);`
  },
  secondary: {
    color: '#141414',
    fontSize: 16,
    padding: theme.spacing(1, 1, 0, 1),
  },
  secondaryTitle: {
    fontSize: 26,
    padding: theme.spacing(1),
  },
  subHeading: {
    fontSize: 16,
    padding: theme.spacing(1, 0),
    color: '#4756ca',
  },
  pos: {
    marginBottom: 12,
  },
}))

export default function TextEditor() {
  const classes = useStyles();

  const [dataList, setWords] = useState([])   // Stores the words fetched by the api
  const [type, setType] = useState()  // Stores the type of fetch that was made
  const [repText, setRepText] = useState()  // Stores the text that can be pasted
  const [definitions, setDefinitions] = useState([])  // Stores definitions featched by the api
  const [information, setInformation] = useState([])  // Stores definitions featched by the api
  const [portmanteaus, setPortmanteaus] = useState([])  // Stores portamanteaus
  const [funChange, setFunChange] = useState()  // Stores the function to chnage focus to the editor
  const [buttonCommand, setButtonCommand] = useState() // Stores the command of the pressed button
  const [selectedText, setSelectedText] = useState() // Stores the selected text 
  const [content, setContent] = useState() // Stores the content of text editor 

  const setRep = e => setRepText(e)
  const typeChange = e => setType(e)

  const handleDataChange = (command, newData) => {
    setInformation([])
    setDefinitions([])
    setPortmanteaus([])
    setWords([])

    if ( command === 'findSimilarEndsWith' || command === 'findSimilarStartsWith' || command === 'wordsStartingWithEndingWith') {
      
      if (command === 'findSimilarEndsWith'){
        const URL = "http://localhost:8088/scc/api/" + command + "?endLetter=" + newData[0] + "&word=" + newData[1]
        fetch(URL)
          .then(res => res.json())
          .then(wordList => setWords(wordList))
          .catch(err => { console.log(err) })
      } else if(command === 'wordsStartingWithEndingWith') {
        const URL = "http://localhost:8088/scc/api/" + command + "?startLetter=" + newData[0] + "&endLetter=" + newData[1]
        fetch(URL)
          .then(res => res.json())
          .then(wordList => setWords(wordList))
          .catch(err => { console.log(err) })
      } else {
        const URL = "http://localhost:8088/scc/api/" + command + "?startLetter=" + newData[0] + "&word=" + newData[1]
        fetch(URL)
          .then(res => res.json())
          .then(wordList => setWords(wordList))
          .catch(err => { console.log(err) })
      }

    } else {
        if(newData !== undefined) {
          const URL = "http://localhost:8088/scc/api/" + command + "?word=" + newData.trim()
          if (command === 'findPortmanteaus') {
            fetch(URL)
              .then(res => res.json())
              .then(wordList => setPortmanteaus(wordList))
              .catch(err => { console.log(err) })
          } if (command === 'findWordInformation') {
            fetch(URL)
              .then(res => res.json())
              .then(wordList => setInformation(wordList))
              .catch(err => { console.log(err) })
          } else {
            fetch(URL)
              .then(res => res.json())
              .then(wordList => setWords(wordList))
              .catch(err => { console.log(err) })
        }
      }
    }
  }

  const handleDefinitionChange = (command, newData) => {
    setWords([])
    const URL = "http://localhost:8088/scc/api/" + command + "?word=" + newData
    fetch(URL)
      .then(res => res.json())
      .then(wordList => setDefinitions(wordList))
      .catch(err => { console.log(err) })
  }

  const mobileHeading = () => {
    if(isMobile) 
      return (<h1 className='pt-5 text-white '>Smart Content Creator</h1>) 
  }

  const legends = () => {
    if(!isMobile) 
      return (<Legends/>) 
  }
  
  const description = () => {
    if(isMobile)
      return (`* Type the content you want to and once you feel the need,
      select the word and press the specific button to get the type of suggestion
       you desire.`)
    else return (`* Type the content you want to and once you feel the need,
      select the word and press the specific key combination or the button 
      to get the type of suggestion you desire.`)
  }

  return (
    <div className="container-fluid" >
      <div>{mobileHeading()}</div>
      <Typography
        className={classes.secondary + ' text-white'}
        style={{fontSize:'0.75rem'}}
      >
        {description()}
      </Typography>
      <div className="row" >
        <div className="col-md-8 col-12 mt-2 ps-2 pe-1">
          <Card className={classes.root}>
            <CardContent className='TextEditor'>
              <PageContainer
                onSearch={handleDataChange}
                onDefChange={handleDefinitionChange}
                onChange={typeChange}
                reptext={repText}
                buttonCommand = {buttonCommand}
                setButtonCommand = {setButtonCommand}
                setContent = {setContent}
                changeFun = {setFunChange}
                selectedText= {selectedText}
                setSelectedText = {setSelectedText}
              />
              <Save 
                content = {content}
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
        <div className="col-md-4 col-12 mt-2 ps-2 pe-1">
          <Suggestions
            type={type}
            dataList={dataList}
            portmanteaus={portmanteaus}
            definitions={definitions}
            information={information}
            onClick={setRep}
            funChange = {funChange}
          />
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-md-12 ps-2 pe-1'>
          <ActionButtons 
            onClick = {setButtonCommand}
          />
          {legends()}
        </div>
      </div>
    </div>
  )
}
