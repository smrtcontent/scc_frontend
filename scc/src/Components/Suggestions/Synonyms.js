import React, { useState, useEffect } from 'react'


const Synonyms = (props) => {
    const URL = "http://localhost:8088/scc/api/findSynonyms?word="+props.value
    const [dataList, setWords] = useState([]);

    useEffect(() => {
    // const fetchAntonyms = () => {
    //         return fetch({URL}, {method: 'GET'}
    //     )
    //     .then( res => {return res.json()})
    //     .then(wordList => {setWords(wordList)})
    //     .catch(err => {console.log(err)})
    //     }
    //     fetchAntonyms()
        fetch("http://localhost:8088/scc/api/findSynonyms?word="+props.value)
            .then(response => response.json())
            .then(respo => {
                console.log("data////", JSON.stringify(respo))
                // console.log("data////", props.wvalue)
                setWords(respo)
                // console.log("data-----", JSON.stringify(dataList.map((data) => data.word)))
                // console.log(JSON.stringify(dataList[0].word))
            }).catch()
    } , [])

    
    return (
        <>
            {dataList.map((data,index) => (<p key={index}> {data.word} </p>))}
        </>
    );

}

export default Synonyms