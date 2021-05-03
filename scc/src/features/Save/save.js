const save = (content, name) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "content": content,
            "fileName": name,
            "id": 12,
            "userId": 34
          })
    };
    fetch('http://localhost:8088/scc/api/saveFile/', requestOptions)
        .then(res => res.json())
        .then(result => console.log(result))
        .catch(err => console.log(err))
}

export default save 