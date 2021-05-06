import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import customCard from '../app/themes/customCard';

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
    const customCards = customCard()

    return (
        <Card className = {customCards.legends}>
            <CardContent>
                <Typography
                    className={classes.secondaryTitle}
                >
                    {'Legend'}
                </Typography>
                <div className="row">
                    <div className='col-md-4'>
                        <ul className={classes.listItem}>
                            {[
                                { item : "'Alt' + A : Find Antonyms"}, 
                                { item : "'Ctrl' + 'Shift' + A : Find Adjectives"},
                                { item : "'Alt' + 'Shift' + A : Find Approximate Rhymes"},
                                { item : "'Ctrl' + 'Shift' + C : Find Consonant Match"},
                                { item : "'Ctrl' + D : Find Definitions"},
                                { item : "'Ctrl' + 'Shift' + F : Find Frequent Follower"},
                                { item : "'Ctrl' + 'Alt' + F : Find Frequent Predecessor"},
                                { item : "'Ctrl' + 'Shift' + H : Find Holonyms"},
                                { item : "'Alt' + H : Find Homphones"},
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
                    <div className='col-md-3'>
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
                                { item : "'Ctrl' + 'Shift' + I : Find Word's Infomration"},
                                { item : "'Alt' + 'Shift' + H : Find Hypernyms"},
                                { item : "'Ctrl' + M : Find Meronyms"},
                                { item : "'Alt' + N : Find Nouns"},
                                { item : "'Alt' + P : Find Prefix Hints"},
                                { item : "'Alt' + 'Shift' + P : Find Portmanteaus"},
                                { item : "'Ctrl' + R : Find Rhymes"},
                                { item : "'Ctrl' + 'Shift' + R : Find Advance Rhymes"},
                                { item : "'Ctrl' + 'Shift' + S : Find Similar Words"},
                                // { item : "'Shift' + 'Alt' + T: Find Trigger"},
                                ].map((x,index) => <li key={index} >{x.item}</li>)
                            }
                        </ul>
                    </div>
                    <div className='col-md-5'>
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
                                { item : "'Alt' + 'Shift' + D : Find Spelt Similar Words"},
                                { item : "'Ctrl' + 'H' : Find Hyponyms Words"},
                                { item : "'Alt' + S : Find Similar Sounding Words"},
                                { item : "'Shift' + 'Alt' + T: Find Trigger"},
                                { item : "'Ctrl' + E : Search for similar words with specific Ending"},
                                { item : "'Ctrl' + 'Shift' + E: Search for words with specific Start and End"},
                                { item : "'Shift' + 'Alt' + S: Search for similar words with specific Start"},
                                { item : "'Shift' + 'Alt' + N: Save the current file"},
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