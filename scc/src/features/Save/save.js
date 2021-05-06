const save = (content, name, setSuccess) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "content": content,
            "fileName": name,
            "userId": 34
          })
    };
    fetch('http://localhost:8088/scc/api/saveFile/', requestOptions)
        .then(res => res.json())
        .then(result => {
            setSuccess(true)
        })
        .catch(err => {console.log(err); setSuccess(false)})
}

export default save 