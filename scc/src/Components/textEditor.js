import React from  'react'
import PageContainer from './pageContainer'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, CardActions, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TextEditor() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Start of an amazing content
        </Typography>
        <PageContainer />
      </CardContent>
      <CardActions>
        <Button 
          variant='contained'
          color='primary'
          size="small">
            Save
        </Button>
      </CardActions>
    </Card>
  );
}
