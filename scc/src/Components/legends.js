import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    secondaryTitle: {
      fontSize: 26,
      padding: theme.spacing(1),
      fontFamily: "'Oleo Script', cursive"
    },
    listItem: {
        fontFamily: "'Bebas Neue', cursive",
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
                <ul className={classes.listItem}>
                    {[
                        {item:"'ctrl' + a : Find Antonyms"}, 
                        {item:"'ctrl' + r : Find Rhymes"},
                        {item:"'ctrl' + s : Find Triggers"},
                        {item:"'ctrl' + q : Find Definitions"}
                        ].map((x,index) => <li key={index} >{x.item}</li>)
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default Legends