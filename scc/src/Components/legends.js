import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    secondaryTitle: {
      fontSize: 26,
      padding: theme.spacing(1),
      fontFamily: "'Oleo Script', cursive"
    },
    pos: {
      marginBottom: 12,
    },
  }))

const Legends = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Typography
                    className={classes.secondaryTitle}
                >
                    {'Legend'}
                </Typography>
                <ul>
                    {[
                        {item:"'ctrl' + a : Find Antonyms"}, 
                        {item:"'ctrl' + r : Find Rhymes"},
                        {item:"'ctrl' + s : Find Triggers"}
                        ].map(x => <li key={x.index} >{x.item}</li>)
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default Legends