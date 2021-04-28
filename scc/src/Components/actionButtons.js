import React from 'react'
import {Button} from '@material-ui/core'

const ActionButtons = props => {

    const handleClick = value => props.onClick(value)
    
    return (
        <>
            <div className='row my-1'>
                <div className='col-12'>
                    {[
                        {command:'find-antonyms',val: 'Antonyms'},
                        {command:'find-adjectives',val: 'Adjectives'}, 
                        {command:'find-approximate-rhymes',val: 'Approximate Rhymes'}, 
                        {command:'find-consonant-match',val: 'Consonant Match'}, 
                        {command:'find-definitions',val: 'Definition'}, 
                        {command:'find-frequent-follower',val: 'Frequent Follower'}, 
                        {command:'find-hyponyms',val: 'Hyponyms'}, 
                        {command:'find-frequent-predecessors',val: 'Frequent Predecessors'}, 
                        {command:'find-holonyms',val: 'Holonyms'}, 
                        {command:'find-homophones',val: 'Homophones'}, 
                        {command:'find-hypernyms',val: 'Hypernyms'},
                        {command:'find-information',val: 'Information'}, 
                        {command:'find-meronyms',val: 'Meronyms'}, 
                        {command:'find-nouns',val: 'Nouns'}, 
                        {command:'find-portmanteaus',val: 'Portmanteaus'}, 
                        {command:'find-prefix-hints',val: 'Prefix Hints'}, 
                        {command:'find-rhymes',val: 'Rhymes'}, 
                        {command:'find-advance-rhymes',val: 'Advance Rhymes'}, 
                        {command:'find-similar',val: 'Similar Words'}, 
                        {command:'find-similar-sound',val: 'Similar Sounding Word'}, 
                    ].map((x,index) => <Button
                        className = 'm-1'
                        size = 'small'
                        key = {index}
                        onClick = {() => handleClick(x.command)}
                        variant = 'contained'
                        color = 'primary'
                    >
                        {x.val}
                    </Button>)}
                </div>
            </div>
        </>
    )
}

export default ActionButtons