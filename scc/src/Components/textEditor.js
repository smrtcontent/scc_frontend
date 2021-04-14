import React,{ useState } from  'react'
import PageContainer from './pageContainer'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 42,
    fontFamily: "'Oleo Script', cursive", 
    color: '#ffffff',
    margin: theme.spacing(0,2,0,2),
    padding: theme.spacing(0),
    textShadow: `0 2px 1.8px -19px rgba(0, 0, 0, 0.028),
    0 4.9px 4.3px -19px rgba(0, 0, 0, 0.04),
    0 9.3px 8.1px -19px rgba(0, 0, 0, 0.05),
    0 16.5px 14.5px -19px rgba(0, 0, 0, 0.06),
    0 30.9px 27.2px -19px rgba(0, 0, 0, 0.072),
    0 74px 65px -19px rgba(0, 0, 0, 0.1);`
  },
  secondary: {
    fontSize: 16,
    padding: theme.spacing(1),
  },
  secondaryTitle: {
    fontSize: 26,
    padding: theme.spacing(1),
    fontFamily: "'Oleo Script', cursive"
  },
  subHeading: {
    fontSize: 16,
    padding: theme.spacing(1),
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
  
  const setChange = (e) => setWords(e)  

  const typeChange = (e) => setType(e)

  const handleDataChange = (newData) => {
    const URL = "http://localhost:8088/scc/api/findAntonyms?word="+newData
    fetch(URL)
        .then(res => res.json())
        .then(wordList => setChange(wordList),

        console.log("my words",JSON.stringify(dataList)))
        .catch(err => {console.log(err)})
  }

  return (
    <div className="container" >
      <Typography 
        className={classes.title} 
        color="textSecondary" 
        gutterBottom={true}
      >
        Smart Content Creator...
      </Typography>
      <Typography
        color='textSecondary'
        className={classes.secondary}
        gutterBottom={true}
      >
        * Type the content you want to and once you feel the need it select the word and 
        press specific key to get the type of suggestion you desire.
      </Typography>
    <div className="row" >
      <div className="col-md-8">
        <Card className={classes.root}>
          <CardContent>
            <PageContainer 
              onSearch = {handleDataChange}
              onChange = {typeChange}
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
      <div className="col-md-4">
        <Card className={ classes.root + ' suggestion-box ' }>
          <CardContent>
            <Typography 
              className={classes.secondaryTitle} 
              color="textPrimary" 
              gutterBottom={true}
              >
              Suggestions
            </Typography>
            <Typography
              className={classes.subHeading}
            >
              {type}
            </Typography>
            {/* <Antonyms 
              value={selection}
              setWords={setWords}
              /> */}
            <ul>
              {dataList.map((data,index) => (<li key={index}> {data.word} </li>))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    <div className='row mt-4'>
      <div className='col-md-12'>
        <Card>
          <CardContent>
            <div className="row">
              <div className="col-md-6 col-12">
                <Typography
                  className={classes.secondaryTitle}
                >
                  Legend
                </Typography>
                <ul>
                  <li>
                    <p>
                      {"'ctrl' + a -> Find Antonyms"} 
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
