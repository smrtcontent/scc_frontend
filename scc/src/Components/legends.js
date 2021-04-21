import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    secondaryTitle: {
      fontSize: 26,
      fontWeight: 700,
      padding: theme.spacing(1),
    },
    listItem: {
        fontSize: 14,
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
                        { item : "'ctrl' + A : Find Antonyms"}, 
                        { item : "'ctrl' + 'Shift' + A : Find Adjectives"},
                        { item : "'alt' + 'Shift' + A : Find Approximate Rhymes"},
                        { item : "'ctrl' + 'Shift' + C : Find Consonant Match"},
                        { item : "'ctrl' + D : Find Definitions"},
                        { item : "'ctrl' + 'Shift' + F : Find Frequent Follower"},
                        { item : "'ctrl' + 'alt' + F : Find Frequent Predecessor"},
                        { item : "'ctrl' + 'shift' + H : Find Holonyms"},
                        { item : "'alt' + H : Find Homphones"},
                        { item : "'alt' + 'shift' + H : Find Hypernyms"},
                        { item : "'ctrl' + r : Find Rhymes"},
                        { item : "'Shift' + 'alt' + t: Find Trigger"},
                        ].map((x,index) => <li key={index} >{x.item}</li>)
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default Legends