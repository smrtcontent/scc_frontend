import React from  'react'
import PageContainer from './pageContainer'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, CardActions, CardContent, Typography, Box } from '@material-ui/core';
import Antonyms from './Suggestions/Antonyms'
// import Synonyms from './Suggestions/Synonyms'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 24,
    color: '#141414',
    padding: theme.spacing(2),
  },
  secondary: {
    fontSize: 18,
    color: '#141414',
    padding: theme.spacing(2),
  },
  pos: {
    marginBottom: 12,
  },
}))

export default function TextEditor() {
  const classes = useStyles();

  const onSearch = (text) => {
    if(text) {
      alert(text)
    }
    return text
  }

  return (
    <div className="row" >
      <div className="col-md-8 offset-md-1">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Start of an amazing content
            </Typography>
            <PageContainer 
              onSearch = {onSearch()}
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
      <div className="col-md-2">
        <Card className={ classes.root }>
          <CardContent>
            <Typography className={classes.secondary} color="textSecondary" gutterBottom>
              Suggestions
            </Typography>
            <Antonyms 
              value="good"
              />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
