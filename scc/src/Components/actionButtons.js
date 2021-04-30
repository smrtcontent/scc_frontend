import React from 'react'
import {Button, Card, CardContent, createMuiTheme, ThemeProvider} from '@material-ui/core'
import { indigo, orange } from '@material-ui/core/colors'

const ActionButtons = props => {

    const handleClick = value => props.onClick(value)

    const themes = createMuiTheme({
        palette: {
            primary: {
            main: orange[900],
        },
        secondary: {
            main: indigo[700],
        }},
    })
    
    return (
        <>
            <Card className='mb-2'>
                <CardContent className='p-1'>
                    <div className='row my-1'>
                        <div className='col-12'>
                        <ThemeProvider theme={themes}>
                            {[
                                {command:'find-antonyms',val: 'Antonyms'},
                                {command:'find-adjectives',val: 'Adjectives'}, 
                                {command:'find-approximate-rhymes',val: 'Approximate Rhymes'}, 
                                {command:'find-consonant-match',val: 'Consonant Match'}, 
                                {command:'find-definitions',val: 'Definition'}, 
                                {command:'find-frequent-follower',val: 'Frequent Follower'}, 
                                {command:'find-hyponyms',val: 'Hyponyms'}, 
                                {command:'find-frequent-predecessors',val: 'Frequent Predecessors'},
                                {command:'find-nouns',val: 'Nouns'}, 
                                {command:'find-rhymes',val: 'Rhymes'}, 
                                {command:'find-holonyms',val: 'Holonyms'}, 
                                {command:'find-homophones',val: 'Homophones'}, 
                                {command:'find-hypernyms',val: 'Hypernyms'},
                                {command:'find-information',val: 'Information'}, 
                                {command:'find-meronyms',val: 'Meronyms'}, 
                                {command:'find-portmanteaus',val: 'Portmanteaus'}, 
                                {command:'find-prefix-hints',val: 'Prefix Hints'}, 
                                {command:'find-advance-rhymes',val: 'Advance Rhymes'}, 
                                {command:'find-similar',val: 'Similar Words'}, 
                                {command:'find-similar-sound',val: 'Similar Sounding Word'},
                                {command:'find-spelt-similar',val: 'Spelt Similar'}, 
                                {command:'find-similar-start',val: 'Similar Start'}, 
                                {command:'find-similar-end',val: 'Similar End'}, 
                                {command:'find-similar-start-end',val: 'Similar Start & End'}, 
                                {command: 'find-triggers', val:'Triggers'}
                            ].map((x,index) => <Button
                                className = 'm-1'
                                size = 'small'
                                key = {index}
                                onClick = {() => handleClick(x.command)}
                                color='primary'
                                variant = 'contained'
                            >
                                {x.val}
                            </Button>)}
                        </ThemeProvider>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ActionButtons