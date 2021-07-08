import { updateUrl } from "../../app/config/URLs";

const updateFile = (content, name, setSuccess, fileId) => {
  const uuid=localStorage.getItem("ccid")
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json",
    "Authorization":'Bearer ' + localStorage.getItem("uTID")
    },
    body: JSON.stringify({
      id: fileId,
      content: content,
      fileName: name,
      userId: uuid,
    }),
  };
  fetch(updateUrl, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if(result.status!==401){
      setSuccess(true);
      }
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};

export default updateFile;
