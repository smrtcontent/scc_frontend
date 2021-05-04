import React from 'react'

const Information = (props) => {
    const information = []

    /**
     *  Fetches the details from the information prop and feeds it into the 
     *  information varibale 
     */
    const title = () => {
        if (props.information !== undefined){
            information.push(<strong> Word </strong>)
            information.push(<span className='ps-2'>{props.information.word}</span>)

            information.push(<strong> Pronunciation </strong>)
            information.push(<span className='ps-2'>{props.information.pron}</span>)

            information.push(<strong> Ipa </strong>)
            information.push(<span className='ps-2'>{props.information.ipa}</span>)

            information.push(<strong> Frequency </strong>)
            information.push(<span className='ps-2'>{props.information.freq}</span>)

            information.push(<strong> Flags </strong>)
            information.push(<span className='ps-2'>{props.information.flags}</span>)

            information.push(<strong> Syllables </strong>)
            information.push(<span className='ps-2'>{props.information.syllables}</span>)
        }
    }

    /**
     * Function call to feed the details to information variable 
     */
    title()

    // Returns the information only if there is there is an information query search
    if (props.information.length === undefined) {
        return(
            <div 
                id="scroll-blue"
                className='suggestions'
                >
                {
                    information.map(
                        (x,index) => <p className='ps-2' key={index}>{x}</p>
                    )
                }
            </div>
        )
    } else {
    // Returns the information only if there is there is not an information query search
        return(
            <>
            </>
        )
    }
}

export default Information