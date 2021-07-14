import { saveUrl } from "../../app/config/URLs";

const save = (setFileId, content, name, setSuccess,setError,setErrorMgs) => {
  const uuid = localStorage.getItem("ccid");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("uTID"),
    },
    body: JSON.stringify({
      content: content,
      fileName: name,
      userId: uuid,
    }),
  };
  fetch(saveUrl, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if (result.status === undefined) {
        setFileId(result.id);
        setSuccess(true);
      } else if (result.status === 208) {
        setErrorMgs("File Alerady Exist. Please Choose different Name.");
        setError(true);
      }
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};

export default save;
