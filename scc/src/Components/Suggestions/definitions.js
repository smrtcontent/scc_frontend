import React from 'react'

const Definitions = (props) => {

    const definitions = []

    /**
     * Maps through the prop to find the definition of each record
     */
    const meaning = () => 
        props.meanings.map(x => x.meanings.map(x => x.definitions.map(
                            x => definitions.push(x.definition))))
    

    /**
     * The function maps through the values of the prop and returns the 
     * parts of speech of each word
     * 
     * Uses a dependecy function meaning() to fetch the definitions 
     *  
     */
    const partOfSpeech = () => {
        props.meanings.map(x => x.meanings.map(x => {
            definitions.push(<strong>{x.partOfSpeech}</strong>)
            meaning()
            return 1
        }))
    }

    partOfSpeech()

    // This is the return module for the definition component 
    if(props.meanings.length > 0) // This will check if the props contain definition or not
    {
        // This section will be returned only if the props contain definitions
        return (
            <div 
                id="scroll-blue"
                className='suggestions ps-2'
                >
                {
                    definitions.map(
                        (x,index) => <p key={index}>{x}</p>
                    )
                }
            </div>
        )
    } else {
        return (
            //This empty react fragment will be returned if the definitions are not there
            <>
            </>
        )
    }
}

export default Definitions