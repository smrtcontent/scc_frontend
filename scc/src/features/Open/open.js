const Open = (filename, setOpenFileContent, setName) => {
    const URL = "http://localhost:8088/scc/api/getFileByUserIdAndName?"+ filename + "=test%201&userId=34"
    fetch(URL)
    .then(res=>res.json())
    .them(result=>{
        setOpenFileContent(result.content)
        setName(result.fileName)
    })
    .catch(err=>console.log(err))

}

export default Open