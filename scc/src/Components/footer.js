import React from 'react'
import {Box} from '@material-ui/core'

const Footer = () => {
    return(
    <div style={{ width: '100%', backgroundColor: '#d6e4f4' }}>
        <Box 
            display="flex" 
            >
            <Box
                display="block" 
                flexGrow={1}
                p={1} 
                m={1.1}
                justifyContent='flex-start'
                
            >
                Made by Govindam Infosoft &#169;
            </Box>
            <Box
                display="block" 
                p={1} 
                m={1}
                justifyContent='flex-end'
            >
                2021
            </Box>
        </Box>
    </div>
    )
}

export default Footer