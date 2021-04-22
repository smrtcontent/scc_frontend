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
                <div className="row">
                    <div>
                        <ul className={classes.listItem}>
                            {[
                                { item : "'Ctrl' + A : Find Antonyms"}, 
                                { item : "'Ctrl' + 'Shift' + A : Find Adjectives"},
                                { item : "'Alt' + 'Shift' + A : Find Approximate Rhymes"},
                                { item : "'Ctrl' + 'Shift' + C : Find Consonant Match"},
                                { item : "'Ctrl' + D : Find Definitions"},
                                { item : "'Ctrl' + 'Shift' + F : Find Frequent Follower"},
                                { item : "'Ctrl' + 'Alt' + F : Find Frequent Predecessor"},
                                { item : "'Ctrl' + 'Shift' + H : Find Holonyms"},
                                // { item : "'Alt' + H : Find Homphones"},
                                // { item : "'Alt' + 'Shift' + H : Find Hypernyms"},
                                // { item : "'Ctrl' + M : Find Meronyms"},
                                // { item : "'Alt' + N : Find Nouns"},
                                // { item : "'Alt' + P : Find Prefix Hints"},
                                // { item : "'Ctrl' + R : Find Rhymes"},
                                // { item : "'Ctrl' + 'Shift' + R : Find Advance Rhymes"},
                                // { item : "'Ctrl' + 'Shift' + S : Find Similar Words"},
                                // { item : "'Shift' + 'Alt' + T: Find Trigger"},
                                ].map((x,index) => <li key={index} >{x.item}</li>)
                            }
                        </ul>
                    </div>
                    <div>
                        <ul className={classes.listItem}>
                            {[
                                // { item : "'Ctrl' + A : Find Antonyms"}, 
                                // { item : "'Ctrl' + 'Shift' + A : Find Adjectives"},
                                // { item : "'Alt' + 'Shift' + A : Find Approximate Rhymes"},
                                // { item : "'Ctrl' + 'Shift' + C : Find Consonant Match"},
                                // { item : "'Ctrl' + D : Find Definitions"},
                                // { item : "'Ctrl' + 'Shift' + F : Find Frequent Follower"},
                                // { item : "'Ctrl' + 'Alt' + F : Find Frequent Predecessor"},
                                // { item : "'Ctrl' + 'Shift' + H : Find Holonyms"},
                                { item : "'Alt' + H : Find Homphones"},
                                { item : "'Alt' + 'Shift' + H : Find Hypernyms"},
                                { item : "'Ctrl' + M : Find Meronyms"},
                                { item : "'Alt' + N : Find Nouns"},
                                { item : "'Alt' + P : Find Prefix Hints"},
                                { item : "'Ctrl' + R : Find Rhymes"},
                                { item : "'Ctrl' + 'Shift' + R : Find Advance Rhymes"},
                                { item : "'Ctrl' + 'Shift' + S : Find Similar Words"},
                                // { item : "'Shift' + 'Alt' + T: Find Trigger"},
                                ].map((x,index) => <li key={index} >{x.item}</li>)
                            }
                        </ul>
                    </div>
                    <div>
                        <ul className={classes.listItem}>
                            {[
                                // { item : "'Ctrl' + A : Find Antonyms"}, 
                                // { item : "'Ctrl' + 'Shift' + A : Find Adjectives"},
                                // { item : "'Alt' + 'Shift' + A : Find Approximate Rhymes"},
                                // { item : "'Ctrl' + 'Shift' + C : Find Consonant Match"},
                                // { item : "'Ctrl' + D : Find Definitions"},
                                // { item : "'Ctrl' + 'Shift' + F : Find Frequent Follower"},
                                // { item : "'Ctrl' + 'Alt' + F : Find Frequent Predecessor"},
                                // { item : "'Ctrl' + 'Shift' + H : Find Holonyms"},
                                // { item : "'Alt' + H : Find Homphones"},
                                // { item : "'Alt' + 'Shift' + H : Find Hypernyms"},
                                // { item : "'Ctrl' + M : Find Meronyms"},
                                // { item : "'Alt' + N : Find Nouns"},
                                // { item : "'Alt' + P : Find Prefix Hints"},
                                // { item : "'Ctrl' + R : Find Rhymes"},
                                // { item : "'Ctrl' + 'Shift' + R : Find Advance Rhymes"},
                                // { item : "'Ctrl' + 'Shift' + S : Find Similar Words"},
                                { item : "'Shift' + 'Alt' + T: Find Trigger"},
                                ].map((x,index) => <li key={index} >{x.item}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Legends